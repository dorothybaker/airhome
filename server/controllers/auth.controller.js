import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(403).json("Email address already exists!");

    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({ fullName, email, password: hashedPassword });

    if (newUser) {
      generateToken(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("Invalid username or password!");

    const existingPassword = bcrypt.compareSync(password, user.password);
    if (!existingPassword)
      return res.status(403).json("Invalid username or password!");

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("airbnb_token", "", { maxAge: 0 });
    res.status(200).json("Logged out successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};
