import { createCommentRepo,getCommentsForPostRepo,deleteCommentRepo } from "./comment.repository.js";
// Create a comment for a post
export const createComment=async (req, res) => {
  try {
    const { postId } = req.query;
    const { text } = req.body;
    const userId=req._id;
    const newComment = await createCommentRepo(postId,userId,text);
    res.json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get comments for a specific post
export const getComments=async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await getCommentsForPostRepo(postId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a comment by ID
export const deleteComment= async (req, res) => {
  try {
    const commentId= req.params.commentId;
    await deleteCommentRepo(commentId);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};