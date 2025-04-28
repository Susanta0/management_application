const { userModel } = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  userRegister: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      return res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  userLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.status(200).json({
        message: "Login successful",
        token,
        userId: user._id,
        email: user.email,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = { userController };
