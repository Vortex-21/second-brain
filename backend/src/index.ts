import express from "express";
import { User } from "./models/User.model";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { main } from "./db";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import { authenticate } from "./middleware";
import { Content } from "./models/Content.model";
import crypto from "crypto";
import { ShareableLinkModel } from "./models/ShareableLinks.model";
import { isTemplateLiteralTypeNode, NewLineKind } from "typescript";
// import "./types/express"
dotenv.config();
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
const UserValidation = z.object({
  username: z.string().min(3).max(10),
  password: z
    .string()
    .min(8, {
      message: "Password should be atleast 8 characters long.",
    })
    .max(20, {
      message: "Password length should not exceed 20 characters.",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password should contain atleast one lowercase letter.",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password should contain atleast one uppercase letter.",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password should contain atleast one number.",
    })
    .refine((val) => /[@$!%*?&]/.test(val), {
      message: "Password should contain atleast one special character.",
    }),
});

const port: number = 3000;
type SignUpType = {
  username: string;
  password: string;
};

app.post("/api/v1/signup", async (req, res) => {
  const { username, password }: SignUpType = req.body;

  try {
    //checking for exisiting users for same username.
    const existing = await User.findOne({
      username: username,
    });
    if (existing) {
      res.status(403).json({
        message: "User with the same username already exists.",
      });
      return;
    }

    //zod validation.
    const validationResult = UserValidation.safeParse({
      username: username,
      password: password,
    });
    if (!validationResult.success) {
      console.log("Signup Zod Validation error: ", validationResult.error);
      res.status(411).json({
        message: validationResult.error,
      });
      return;
    }
    //password hashing
    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(password, salt);
    //DB insertion.
    await User.create({
      username: username,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "Signed up successfully!",
    });
  } catch (err) {
    console.log("Error at signup : ", err);
    res.status(500).json({
      message: "Please try again later.",
    });
  }
});

app.post("/api/v1/signin", limiter, async (req, res) => {
  const { username, password }: SignUpType = req.body;

  //DB checking
  const userExists = await User.findOne({ username: username });

  if (
    userExists &&
    userExists.password &&
    bcrypt.compareSync(password, userExists.password)
  ) {
    if (!JWT_SECRET) {
      console.log("JWT_SECRET is not set!");
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    }
    //jwt token creation
    const payload = { id: userExists._id };
    const token = jwt.sign(payload, JWT_SECRET);

    //send back token.
    res.status(200).json({
      message: "logged in",
      token: token,
    });
    return;
  } else {
    res.status(403).json({
      message: "Wrong username or password",
    });
  }
});

app.post("/api/v1/content", authenticate, async (req, res) => {
  const { title, link = "", tags = [] } = req.body;
  try {
    await Content.create({
      title,
      link,
      tags,
      userId: req.userId,
    });
    res.status(200).json({
      message: "New Content add to your brain!",
    });
  } catch (err) {
    console.log("Error at add content : ", err);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

app.get("/api/v1/content", authenticate, async (req, res) => {
  const userId = req.userId;
  try {
    const content = await Content.find({ userId: userId }).populate(
      "userId",
      "username"
    );
    res.json({
      Content: content,
    });
  } catch (err) {
    console.log("Error at get Content : ", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.delete("/api/v1/content", authenticate, async (req, res) => {
  const { contentId } = req.body;
  try {
    const deletedContent = await Content.findOneAndDelete({
      _id: contentId,
      userId: req.userId,
    });

    if (!deletedContent) {
      res.status(404).json({
        message: "No such content exists in your brain!",
      });
      return;
    }

    res.status(200).json({
      message: "Deleted successfully!",
    });
    return;
  } catch (err) {
    console.log("Error at delete content : ", err);
    res.status(500).json({
      message: "Internal Server error.",
    });
  }
});

app.post("/api/v1/brain/share", authenticate, async (req, res) => {
  //Step-1: generate a token and build the url .
  const token = crypto.randomBytes(32).toString("hex");
  const shareLink = `${req.protocol}://${req.get("host")}/api/v1/brain/${token}`;

  //Step-2: store this generated token along with the userId in the ShareableLinks table.
  try {
    await ShareableLinkModel.create({
      token: token,
      permissions: ["view"],
      userId: req.userId,
    });
    res.status(200).json({
      "share-link": shareLink,
    });
  } catch (err) {
    console.log("Error at generate share-link route : ", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
 
});

app.get("/api/v1/brain/:token", async (req,res) => {
  const {token} = req.params;
  try{
    const share = await ShareableLinkModel.findOne({token : token});
    if(share){
      const userId = share.userId;
      const content = await Content.find({userId: userId});
      res.status(200).json({
        content: content
      });
      return;
    }
    else{
      res.status(404).json({
        message:"No such brain found!"
      });
      return;
    }

  }
  catch(err){
    console.log("Error at get shared brain route", err);
    res.status(500).json({
      message : "Internal Server Error!"
    });
  }
});

app.get("/home", (req, res) => {
  console.log("hit home !");
  res.json({
    message: "This is home route!",
  });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page Not Found!" });
  return;
});

app.listen(port, async () => {
  await main();
  console.log(`Listening at port ${port}`);
});
