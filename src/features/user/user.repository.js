import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import {
  compareHashedPassword,
  hashPassword,
} from "../../utils/hashPassword.js";

const UserModel = mongoose.model("User", userSchema);

export const userRegisterationRepo = async (userData) => {
  try {
    const newUser = new UserModel(userData);
    await newUser.save();
    return { success: true, res: newUser };
  } catch (error) {
    // throw new Error("email duplicate");
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
export const userLoginRepo = async (userData) => {
  try {
    const { email, password } = userData;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "user not found" },
      };
    } else {
      let passwordValidation = await compareHashedPassword(
        password,
        user.password
      );
      if (passwordValidation) {
        //store token in array
        return { success: true, res: user };
      } else {
        return {
          success: false,
          error: { statusCode: 400, msg: "invalid credentials" },
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

export const updateUserPasswordRepo = async (_id, newpassword, next) => {
  try {
    const user = await UserModel.findOne({ _id });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "user not found" },
      };
    } else {
      const newHashedPassword = await hashPassword(newpassword, next);
      user.password = newHashedPassword;
      let updatedUser = await user.save();
      return { success: true, res: updatedUser };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

export const logoutAllDevicesRepo = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Clear all tokens from the user
    user.tokens = [];
    await user.save();

    return { success: true, message: 'Logged out from all devices successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addtoken=async (email,token)=>{
  const olduser=await UserModel.findOne({email});
  olduser.tokens.push(token)
  olduser.save();
}
export const addAvatarRepo=async(id,avatarLink)=>{
  const user=await UserModel.findById({_id:id});
  user.avatar=avatarLink;
  user.save();
  return user;
}