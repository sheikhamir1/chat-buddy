import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./Database/ConnectMongodb.js";
import { server, app } from "./Utils/Socket.js";

// import routes
import { authRouter } from "./Routes/AuthRouter.js";
import { messageRouter } from "./Routes/messageRouter.js";

// import middlewares
import { isUserLogin } from "./Middlewares/isUserLogin.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { logger } from "node-super-logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, "../../client/dist");
// console.log(publicPath);

// middleware
app.use(express.static(publicPath));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", isUserLogin, messageRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

server.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on port 3000");
  connectDB();
});
