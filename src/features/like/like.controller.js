import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { getLikesRepo, likeRepo } from "./like.repository.js";

export const like = async (req, res, next) => {
  const { postId } = req.query;
  const user_id=req._id;
  try {
    const resp = await likeRepo(user_id, postId);
    if (resp) {

      res
        .status(201)
        .json({ success: true, msg: "Post liked successfully", resp });
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};

export const getLikes = async (req, res, next) => {
  const { postId } = req.query;
  const user_id=req._id;
  if (!postId || !user_id) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide a valid post_id" });
  }
  try {
    const resp = await getLikesRepo(user_id,postId);
    if (resp) {
      res.status(200).json({ success: true, resp });
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};
