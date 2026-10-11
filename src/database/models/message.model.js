import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    content:{
        type:String,
        required:true,
        minlength:1,
        maxlength:200,
        trim:true
    },
    receiver:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    sender:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})


const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);


  export default Message
