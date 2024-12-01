import express, { urlencoded } from "express";
import { User } from "./models/User.model";
import { z } from "zod";
import bcrypt from "bcryptjs";
import {main} from "./db"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config();
const app = express();


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
      password: password,
    });
    if (existing) {
      res.status(403).json({
        message: "User with the same username already exists.",
      });
      return;
    }

    //zod validation.
    const validationResult = UserValidation.safeParse({username:username, password:password});
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
        message:"Signed up successfully!"
    })
  } 
  catch (err) {

    console.log("Error at signup : ", err);
    res.status(500).json({
      message: "Please try again later.",
    });
  
  }
});

app.post("/api/v1/signin", async(req, res) => {
    const {username, password} = req.body;
    
    
    
    //DB checking
    const userExists = await User.findOne({username:username});
    
    
    

    if(userExists && userExists.password && bcrypt.compareSync(password, userExists.password)){
        if(!JWT_SECRET){
            console.log("JWT_SECRET is not set!")
            res.status(500).json({
                message:"Internal Server Error"
            })
            return;
        }
        //jwt token creation
        const payload =  {id: userExists._id};
        const token = jwt.sign(payload, JWT_SECRET)
        
        //send back token.
        res.status(200).json({
            message:"logged in", 
            token: token
        });
        return;
    }
    else{
        res.status(403).json({
            message:"Wrong username or password", 
        })
    }
});

app.post("/api/v1/addContent", (req, res) => {});

app.get("/home", (req, res) => {
  console.log("hit home !");
  res.json({
    message: "This is home route!",
  });
});

app.listen(port, async() => {
  await main();
  console.log(`Listening at port ${port}`);
});
