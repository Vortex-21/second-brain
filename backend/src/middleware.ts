import jwt, { Jwt } from "jsonwebtoken"
import {Request, Response, NextFunction} from "express"
const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(req:Request, res:Response, next:NextFunction){
    const token = req.cookies["token"];
    // console.log("cookies: ", req.cookies); 
    // console.log("token: ", token);
    if(!token || typeof token !== 'string'){
        res.status(401).json({
            "message": "Please log in first."
        })
        return 
       
    }
    try{
        if(!JWT_SECRET){
            console.log(`JWT_SECRET not found! Found : ${JWT_SECRET}`);
            res.status(500).json({
                message : "Internal Server Error"
            });
            return;
        }
        const result = jwt.verify(token, JWT_SECRET);
        if(typeof(result)==='object' && "id" in result){
            req.userId = result.id;

            next();
        }
        else{
            res.status(403).json({
                message : "Invalid or expired token."
            })
        }
        
        

    }
    catch(err){
        console.log("Error in auth middleware : ",err);
        res.status(401).json({
            message : "Invalid or expired token!"
        })
        return;
    }

}