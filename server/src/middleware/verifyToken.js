import jwt from "jsonwebtoken";
import User from "../models/user.js";

export default async function verifyToken(req, res, next) {
  if (req.url === "/api/auth/login" || req.url === "/api/auth/register") {
    return next();
  }

  try {
    const token = req.header("Authorization").split(" ")[1];

    if (!token) {
      console.log("Access Denied");
      return res.status(401).json({ success: false, message: "Access Denied" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified._id).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
}
