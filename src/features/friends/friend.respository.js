import mongoose from "mongoose";
import { friendSchema } from "./friend.schema.js";

const friendModel=mongoose.model('Friend',friendSchema);

// Function to confirm a friend request

export const confirmFriendRequestRepo = async (userId, friendId) => {
  try {
    // Find the user's friend request and remove it
    const requestExists=await friendModel.updateOne(
      { user: userId },
      { $pull: { friend_request: friendId } }
    );

    if(requestExists.modifiedCount>0){
      await friendModel.updateOne(
        { user: userId },
        { $push: { friends: friendId } }
      );
      await friendModel.updateOne(
        { user: friendId },
        { $push: { friends: userId } },{upsert:true}
      );
      console.log("frined request confirmed");
      return { success: true, message: 'Friend request confirmed' };
    }
    else
    return { success: false, message: 'Already a Friend No such requests' };

  } catch (error) {
    return { success: false, message: error.message };
  }
};




//send Friend Request

export const sendFriendRequestRepo = async (userId, friendId) => {
  try {
    // Check if friendId is the same as userId
    if (userId === friendId) {
      return { success: false, message: 'Request cannot be sent to self' };
    }

    // Check if there's an existing pending request
    const existingRequest = await friendModel.findOne({
      user: friendId,
      friend_request: userId
    });
    const isfriend=await friendModel.findOne({
      user:userId,
      friends:friendId,
    })
    // Check if friendId is already a friend or there's an existing pending request
    if (isfriend || existingRequest) {
      return { success: false, message: 'Friend request already sent or are friends' };
    }

    // Add friendId to the user's friend_request list
    await friendModel.updateOne(
      { user: friendId },
      { $addToSet: { friend_request: userId } },
      { upsert: true }
    );
    
    return { success: true, message: 'Friend request sent' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

