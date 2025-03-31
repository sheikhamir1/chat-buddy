// import models
import { signToken } from "../Middlewares/SignToken.js";
import { User } from "../Models/userModel.js";
import { cloudinary } from "../Utils/CloudinaryConfig.js";
import { upload } from "../Middlewares/Multer.js";

const userDetails = async (req, res) => {
  const id = req.currentUserID;
  // console.log(`id: ${id}`);

  try {
    const findUser = await User.findById(id).select("-password -__v");
    // console.log(`findUser: ${findUser}`);

    if (!findUser) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ findUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const signupUser = async (req, res) => {
  const { email, fullName, password, profilePic } = req.body;

  const signupUser = {
    email,
    fullName,
    password,
    profilePic,
  };
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (fullName.length < 3) {
      return res.status(400).json({
        message: "Full name must be at least 3 characters long",
      });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const addUser = new User(signupUser);

    if (addUser) {
      signToken(addUser._id, res);
    }
    await addUser.save();
    res.status(201).json({ message: "user Signup successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    const checkUser = await User.findOne({ email: email });
    // console.log(checkUser);

    if (!checkUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isValid = await checkUser.isValidPassword(
      password,
      checkUser.password
    );
    // console.log("isValid", isValid);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      signToken(checkUser._id, res);
    }

    res.status(200).json({ message: "User login successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", " ", { maxAge: 0 });
    res.status(200).json({ message: "User logout successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const updateProfile = async (req, res) => {
  const id = req.currentUserID;
  // console.log(`id: ${id}`);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "image is required" });
    }

    const profilePic = req.file.path;

    // console.log("Filename:", req.file.filename);
    // console.log("Mimetype:", req.file.mimetype);
    // console.log("Path:", req.file.path);
    // console.log(`profilePic: ${profilePic}`);

    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      // upload_preset: "file",
    });

    // console.log(`uploadResponse: ${uploadResponse}`);

    const updateProfile = await User.findByIdAndUpdate(
      id,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select("-password -__v");

    return res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
export { userDetails, signupUser, loginUser, logoutUser, updateProfile };
