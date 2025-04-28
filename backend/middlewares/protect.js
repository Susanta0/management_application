const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.models");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protect };
