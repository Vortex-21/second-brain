import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
    title:{
        type:String, 
        required:true
    }, 
    link:{
        type:String
    }, 
    tags:[{type: mongoose.Types.ObjectId, ref : "tags"}], 
    userId : {type: mongoose.Types.ObjectId, ref: "users", required: true}
});

export const Content =  mongoose.model("Content", ContentSchema)