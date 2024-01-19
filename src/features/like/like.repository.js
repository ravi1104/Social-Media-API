import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";


const likeModel = mongoose.model("Like", likeSchema);


export const likeRepo = async (user_id, postId) => {
  const likeExists= await likeModel.findOne({
    user: user_id,
    post:postId,
  });
  if(likeExists){
    throw new Error("You Already like it once")
  }
  const newLike = new likeModel({
    user: user_id,
    post:postId,
  });
  
  return await newLike.save();
};
export const getLikesRepo = async (user_id, post_id) => {
  const filter = { user:user_id, post:post_id };
  return likeModel
    .findOne(filter)
    .populate("user", "name email gender")
    .populate("post","imageUrl caption");
};
