
import mongoose, { mongo } from "mongoose";

export const friendSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  friends:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  friend_request:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }]
});
