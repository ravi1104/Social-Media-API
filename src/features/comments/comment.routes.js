import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import { createComment, getComments,deleteComment } from "./comment.controller.js";

const router = express.Router();

router.route("/comment").post(auth, createComment);
router.route("/comment/:postId").get(auth, getComments);
router.route("/delete/:commentId").delete(deleteComment);
export default router;
