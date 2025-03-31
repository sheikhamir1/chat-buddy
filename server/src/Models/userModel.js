import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = (this.password = await bcrypt.hash(this.password, salt));
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.isValidPassword = async function (password, actulPassword) {
  try {
    return await bcrypt.compare(password, actulPassword);
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("User", userSchema);

export { User };
