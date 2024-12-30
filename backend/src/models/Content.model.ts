import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
    content_type:{
        type: String, 
        enum: ["Document", "Video", "Tweet"], 
        required:true
    },
    title:{
        type:String, 
        required:true
    }, 
    description:{
        type: String
    },
    link:{
        type:String
    }, 
    tags:[{type: mongoose.Types.ObjectId, ref : "Tag"}], 
    userId : {type: mongoose.Types.ObjectId, ref: "User", required: true}
});

export const Content =  mongoose.model("Content", ContentSchema)