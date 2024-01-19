
import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  imageUrl:{
    type:String,
    required:true,
  },
  caption: String,
});
