import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
  let token;

  // Check cookie token first
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Fallback to Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If token is still not found
  if (!token) {
    return next(
      new HandleError("Authentication is missing! Please login to access the resource", 401)
    );
  }

  // Decode token
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedData.id);

  next();
});
