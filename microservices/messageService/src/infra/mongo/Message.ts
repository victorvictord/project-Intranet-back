import mongoose from "mongoose";
const Schema = new mongoose.Schema({
  _id: {type: String},
  authorId: {type:String, required: true, index:true},
  content: {type: String, required: true, index:true},
  createdAt: {type: Date, default: ()=> new Date(), index: true},
  read: {type: Boolean, default: false, index:true},
});
export const MessageModel = mongoose.model("Message", Schema);