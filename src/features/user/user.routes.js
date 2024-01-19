import express from "express";
import {
  updateUserPassword,
  userLogin,
  userLogout,
  userRegisteration,
  addAvatar
} from "./user.cotroller.js";
import { auth } from "../../middlewares/jwtAuth.js";
import {emailOtp,validateOtp} from "../../middlewares/emailOtp.js";
import handleFileUpload from "../../middlewares/handleFileUpload.js";
const router = express.Router();

router.route("/register").post(userRegisteration);
router.route("/login").post(userLogin);
router.route("/logoutalldevices").post(auth,userLogout);
router.route("/resetPass").post(auth,emailOtp);
router.route("/otp").post(auth,validateOtp,updateUserPassword);

router.route("/addAvatar").post(handleFileUpload,auth,addAvatar);
export default router;
