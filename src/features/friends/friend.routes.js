import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import { sendFriendRequest, confirmFriendRequest } from "./friend.controller.js";

const router = express.Router();

router.route("/sendRequest").post(auth, sendFriendRequest);

router.route("/approveRequest").post(auth, confirmFriendRequest);

export default router;
