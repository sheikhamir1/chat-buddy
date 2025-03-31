import jwt from "jsonwebtoken";
import { User } from "../Models/userModel.js";

const isUserLogin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "You are not logged in please login first." });
    }

    const checkUser = jwt.verify(token, process.env.JWT_SECRET);

    if (!checkUser) {
      return res
        .status(401)
        .json({ message: "invalid token please login first." });
    }

    const userID = await User.findById(checkUser.userId, "_id email fullName");
    // console.log(`userID: ${userID}`);

    if (!userID) {
      return res
        .status(401)
        .json({ message: "invalid token please login first." });
    }

    req.currentUserID = userID._id;
    // console.log(`req.user.id: ${req.currentUserID}`);

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export { isUserLogin };
