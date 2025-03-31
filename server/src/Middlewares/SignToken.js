import jwt from "jsonwebtoken";

const signToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "DEVELOPMENT",
      // sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export { signToken };
