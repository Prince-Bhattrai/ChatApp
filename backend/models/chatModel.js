import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
        required:true
    }
}, {timestamps:true})
export const Chat = mongoose.model("Chat", chatSchema)