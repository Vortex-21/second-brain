import jwt from "jsonwebtoken"
import {Request, Response, NextFunction} from "express"
const JWT_SECRET = process.env.JWT_SECRET;
export function authenticate(req:Request, res:Response, next:NextFunction){
    
    const token = req.headers.authorization;
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
        console.log("result : ",result);
        next();

    }
    catch(err){
        console.log("Error in auth middleware : ",err);
        res.status(401).json({
            message : "Invalid or expired token!"
        })
        return;
    }

}