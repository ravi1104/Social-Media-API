
import mongoose, { mongo } from "mongoose";

export const commentSchema = new mongoose.Schema({
  post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post',
    required:[true,"Post id is utmost important"]
  },
  comments:[
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: String
    },
    
  ]

});
