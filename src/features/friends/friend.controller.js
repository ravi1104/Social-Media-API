import { confirmFriendRequestRepo,sendFriendRequestRepo } from "./friend.respository.js";


export const confirmFriendRequest = async (req, res) => {
  const {friendId } = req.query;
  const userId=req._id;
  try {
    const result = await confirmFriendRequestRepo(userId, friendId);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const sendFriendRequest = async (req, res) => {
    const {friendId } = req.query;
    const userId=req._id;
    try {
      const result = await sendFriendRequestRepo(userId, friendId);
  
      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
