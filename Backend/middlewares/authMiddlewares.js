import JWT from "jsonwebtoken";
import userModel from "../models/authModel.js";
import salonModel from "../models/salonAuthModel.js";

//protect routes on token base
export const requireSignIn = async (req, resp, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_KEY);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
    resp.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

//admin access
export const isAdmin = async (req, resp, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return resp.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    resp.status(401).send({
      success: false,
      message: "Error In Admin Middleware",
    });
  }
};

// Salon owner access middleware
export const isSalonOwner = async (req, resp, next) => {
  try {
    // Ensure req.user is set by previous authentication middleware
    if (!req.user || !req.user._id) {
      return resp.status(401).send({
        success: false,
        message: "Unauthorized Access: No user data found",
      });
    }

    const user = await salonModel.findById(req.user._id);

    // Check if the user role is salon owner (role === 2)
    if (!user || user.role !== 2) {
      return resp.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (err) {
    console.log("Error in isSalonOwner middleware:", err);
    resp.status(401).send({
      success: false,
      message: "Error In Salon Middleware",
      error: err.message,
    });
  }
};

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }

    const decoded = JWT.verify(token, process.env.JWT_KEY);
    console.log("Decoded token:", decoded); // Check if `_id` is present
    req.user = await salonModel.findById(decoded._id).select("-password");
    console.log(req.user);
    console.log("Authenticated user in authenticateUser middleware:", req.user); // Debug log

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found, authorization denied" });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

//for requireSignInForReviews
export const requireSignInForReviews = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required.",
      });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing or malformed.",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_KEY); // Verify token
    req.user = decoded; // Attach decoded token to `req.user`

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};