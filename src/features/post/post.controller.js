import { createPostRepo,getAllPostsRepo,deletePostRepo,updatePostRepo } from "./post.repository.js";

import { customErrorHandler } from "../../middlewares/errorHandler.js";
// Create a new post

export const createPost= async (req, res) => {
  try {
    const { caption } = req.body;
    const userId=req._id;
    if (!req.file) {
      throw new customErrorHandler(500,"file not Provided")
    }
    const imageUrl = 'http://localhost:3000/images/' + req.file.filename;

    const newPost = await createPostRepo({ userId,imageUrl, caption });
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all posts
export const getAllPosts=async (req, res) => {
  try {
    const allPosts = await getAllPostsRepo();
    res.json(allPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update a post by ID
export const updatePost=async (req, res) => {
  try {
    const {caption}=req.body;
    if (!req.file) {
      throw new customErrorHandler(500,"file not Provided")
    }
    const imageUrl = 'http://localhost:3000/images/' + req.file.filename;
    const updatedPost = await updatePostRepo(req.params.postId, caption,imageUrl);

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a post by ID
export const deletePost= async (req, res) => {
  try {
    await deletePostRepo(req.params.postId);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
