import mongoose from "mongoose";
import { postSchema } from "./post.schema.js";

const postModel=mongoose.model('Post',postSchema);

  export const createPostRepo=async (data)=> {
    const newPost=new postModel(data);
    return await newPost.save();
  }

  export const getAllPostsRepo=async ()=> {
    return await postModel.find();
  }

  export const getPostByIdRepo=async (postId)=> {
    return await postModel.findById(postId);
  }

  export const updatePostRepo=async (postId, caption, imageUrl) =>{
    const updatedPost = await postModel.findByIdAndUpdate({_id:postId}, { caption: caption }, { new: true });

    console.log(updatedPost);
    return updatedPost;
    // console.log(updatedPost);
  
  }

  export const deletePostRepo=async (postId)=> {
    return await postModel.findByIdAndDelete(postId);
  }


