import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
    title:{
        type:String, 
        required:true
    }, 
    link:{
        type:String
    }, 
    tags:[{type: mongoose.Types.ObjectId, ref : "Tag"}], 
    userId : {type: mongoose.Types.ObjectId, ref: "User", required: true}
});

export const Content =  mongoose.model("Content", ContentSchema)