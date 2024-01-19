import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import { getAllPosts, createPost, updatePost, deletePost } from "./post.controller.js";
import handleFileUpload from "../../middlewares/handleFileUpload.js";
const router = express.Router();

router.route("/newPost").post(auth,handleFileUpload, createPost);
router.route("/allPost/:id").get(auth, getAllPosts);
router.route("/updatePost/:postId").put(auth,handleFileUpload,updatePost);
router.route("/deletePost/:postId").delete(auth,deletePost);
export default router;
