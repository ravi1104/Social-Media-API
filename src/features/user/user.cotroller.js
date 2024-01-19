import {
  updateUserPasswordRepo,
  userLoginRepo,
  userRegisterationRepo,
  logoutAllDevicesRepo,
  addtoken,
  addAvatarRepo,
} from "./user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../../middlewares/errorHandler.js";


export const userRegisteration = async (req, res, next) => {
  let { password } = req.body;
  password = await bcrypt.hash(password, 12);
  const resp = await userRegisterationRepo({ ...req.body, password });
  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "user registration successful",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
export const userLogin = async (req, res, next) => {
  const resp = await userLoginRepo(req.body);
  if (resp.success) {

    const token = jwt.sign(
      { _id: resp.res._id, user: resp.res },
      "qwertyuiopsdfghjklzxcvbnm",
      {
        expiresIn: "1h",
      }
    );
    await addtoken(req.body.email,token);
    res.cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true });
    res.json({ success: true, msg: "user login successful", token });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
export const updateUserPassword = async (req, res, next) => {
  //send otp to email using nodemailer

  const { newPassword } = req.body;
  const resp = await updateUserPasswordRepo(req._id, newPassword, next);
  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "password updated successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

export const userLogout = (req, res, next) => {
  logoutAllDevicesRepo(req._id);
  res.clearCookie("jwtToken").json({ success: true, msg: "logout successful" });
};


export const addAvatar=async (req,res,next)=>{

  if(!req.file){
      return res.status(400).json({"message":"file not provided"});
    }
  const avatarLink='http://localhost:3000/images/' + req.file.filename;
  const avatarAdded=await addAvatarRepo(req._id,avatarLink);
  if(avatarAdded){
    res.status(201).json(avatarAdded.avatar);
  }
  else{
    res.status(400).json({message:"something went wrong"});
  }
}