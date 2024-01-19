import mongoose from 'mongoose';

import { commentSchema } from './comment.schema.js';
import { customErrorHandler } from '../../middlewares/errorHandler.js';

const commentModel=mongoose.model('Comment',commentSchema);

export const createCommentRepo = async (postId, userId, text) => {
  try {
    // Find the post and pull the previous comment of the same user if it exists
    const post = await commentModel.findOne({ post: postId });
    if (post) {
      const updatedComments = post.comments.filter(comment => comment.user != userId);
      post.comments = updatedComments;
      await post.save();
    }
    // Add the new comment
    const filter = { post: postId };
    const update = {
      $push: {
        comments: {
          user: userId,
          text: text
        }
      }
    };

    const result = await commentModel.updateOne(filter, update, { upsert: true });
    return result;
  } catch (error) {
    return { success: false, message: error.message };
  }
};



export const getCommentsForPostRepo = async (postId) => {
  try {
    return await commentModel
    .find({ post: postId })
    .populate({
      path: 'post',
      select: 'imageUrl caption'
    }).populate({
      path:'comments.user',
      select:"name email"
    });

  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteCommentRepo = async (commentId) => {
    const commentToDelete = await commentModel.findById(commentId);

    if (!commentToDelete) {
      throw new Error( 'Comment already deleted or does not exist');
    }

    const deletedComment = await commentModel.findByIdAndDelete(commentId);
    return { success: true, message: 'Comment successfully deleted', deletedComment };
  
};


