import crypto from "crypto"; // For generating OTP
import userModel from "../models/authModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  tls: {
    ciphers: "SSLv3",
  },
  port: 587,
  auth: {
    user: process.env.USER1, // Email address
    pass: process.env.PASS_KEY, // Password or app-specific key
  },
});
console.log(process.env.USER1);

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exist",
      });
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(1000, 9999);

    // Store the OTP and expiry in the user document (or use a temporary store)
    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    // Send the OTP via email
    const mailOptions = {
      from: process.env.USER1,
      to: email, // User's email
      subject: "OTP for Salon Sphere",
      text: `Your OTP for resetting your password is: ${otp}.
Please use this OTP within 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).send({
      success: true,
      message: "OTP sent successfully to your email",
    });
  } catch (error) {
    console.error("Error while sending email:", error);
    return res.status(500).send({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};
  export  const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
   
  
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }
  
    const user = await userModel.findOne({ email });
   
    if (!user || user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP",user:user });

    }
  
    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  };