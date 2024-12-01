import mongoose from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()
const MONGO_URL = process.env.MONGO_URL;


export async function main(){
    // console.log("url : ", MONGO_URL)
    try{
        await mongoose.connect(MONGO_URL??"",{
            dbName:"second-brain"
        })
        console.log("DB connected ! ")

    }
    catch(err){
        console.log("DB Connection ERROR: ",err)
    }
}

// main();