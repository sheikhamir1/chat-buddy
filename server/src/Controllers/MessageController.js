import { User } from "../Models/userModel.js";
import { Message } from "../Models/messageModel.js";
import { cloudinary } from "../Utils/CloudinaryConfig.js";
import { getReceiverSocketID, io } from "../Utils/Socket.js";

const getAllUsers = async (req, res) => {
  try {
    const currentuserID = req.currentUserID;
    // console.log(`id: ${currentuserID}`);

    const fliterCurrentUser = await User.find({
      _id: { $ne: currentuserID },
    }).select("-password -__v");
    res
      .status(200)
      .json({ result: fliterCurrentUser.length, fliterCurrentUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const getMessages = async (req, res) => {
  const { id } = req.params;
  const receiverId = id;
  const currentuserID = req.currentUserID;
  // console.log(`id: ${currentuserID}`);
  try {
    if (!receiverId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const userMessages = await Message.find({
      $or: [
        { senderID: currentuserID, receiverID: receiverId },
        { senderID: receiverId, receiverID: currentuserID },
      ],
    });
    res.status(200).json({ result: userMessages.length, userMessages });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const sendMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const currentuserID = req.currentUserID;
    // console.log(`id: ${currentuserID}`);
    const receiverId = id;

    let imageUrl = "";

    const image = req.file?.path;

    // console.log("Filename:", req.file.filename);
    // console.log("Mimetype:", req.file.mimetype);
    // console.log("Path:", req.file.path);

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        // upload_preset: "image",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderID: currentuserID,
      receiverID: receiverId,
      message: message,
      image: imageUrl,
    });
    await newMessage.save();

    // const receiverSocketId = getReceiverSocketID(receiverId);

    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("message", newMessage);
    // }

    const receiverSocketId = getReceiverSocketID(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message", newMessage); // Emit to receiver
    }

    // Get the sender's socket ID and emit the message to the sender as well
    const senderSocketId = getReceiverSocketID(currentuserID);
    if (senderSocketId) {
      io.to(senderSocketId).emit("message", newMessage); // Emit to sender
    }

    res.status(201).json({ newMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export { getAllUsers, getMessages, sendMessages };
