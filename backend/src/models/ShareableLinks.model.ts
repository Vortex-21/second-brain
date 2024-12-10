import mongoose from "mongoose";

const ShareableLinksSchema = new mongoose.Schema({
    token:{
        type:String, 
        requried:true,
        unique:true
    },
    userId:{
        type:mongoose.Types.ObjectId, 
        ref:"User",
        required:true,
        

    }, 
    permissions:["view"],
    createdAt:{
        type:Date, 
        default:Date.now,
        expires:30*24*60*60
    }
});
 
export const ShareableLinkModel = mongoose.model( "ShareableLinks", ShareableLinksSchema);
