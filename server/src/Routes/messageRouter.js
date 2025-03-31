import express from "express";

// import controllers
import {
  getAllUsers,
  getMessages,
  sendMessages,
} from "../Controllers/MessageController.js";
import { upload } from "../Middlewares/Multer.js";

const messageRouter = express.Router();

messageRouter.get("/", getAllUsers);
messageRouter.get("/:id", getMessages);
messageRouter.post("/send/:id", upload.single("image"), sendMessages);

export { messageRouter };
