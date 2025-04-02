import express, { Router } from "express";

// import middlewares
import { bodyLogger, paramLogger, headersLogger } from "node-super-logger";

// import controllers
import {
  userDetails,
  signupUser,
  loginUser,
  logoutUser,
  updateProfile,
  GoogleLogin,
} from "../Controllers/AuthUsersControllers.js";
import { isUserLogin } from "../Middlewares/isUserLogin.js";
import { upload } from "../Middlewares/Multer.js";

const authRouter = express.Router();

authRouter.get("/", isUserLogin, userDetails);
authRouter.post("/signup", bodyLogger, signupUser);
authRouter.post("/login", bodyLogger, loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post(
  "/update",
  upload.single("profilePic"),
  isUserLogin,
  headersLogger,
  bodyLogger,
  paramLogger,
  updateProfile
);
authRouter.post("/google", GoogleLogin);

export { authRouter };
