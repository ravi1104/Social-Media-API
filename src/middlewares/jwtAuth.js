import jwt from "jsonwebtoken";

import mongoose from "mongoose";

export const auth = async (req, res, next) => {
  const { jwtToken } = req.cookies;
  jwt.verify(jwtToken, "qwertyuiopsdfghjklzxcvbnm", async (err, data) => {
    if (err) {
      res.status(400).send("unauthorized! login to continue!");
    } else {
      // console.log("data is", data);
      req._id = data._id;
      req.user = data.user;
      next();
    }
  });
};
