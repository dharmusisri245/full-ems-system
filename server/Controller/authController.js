import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";
import { generateOTP, otpExpireTime } from "../services/otpService.js";
import { sendEmail } from "../services/emailService.js";

// ---------------------------
// REGISTER
// ---------------------------
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    let avatarData = {};

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      avatarData = { url: upload.secure_url, public_id: upload.public_id };
    }

    const hashedPass = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPass,
      avatar: avatarData,
    });

    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// LOGIN
// ---------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.json({ message: "Login success", token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// FORGOT PASSWORD (SEND OTP)
// ---------------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Email not found" });

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpire = otpExpireTime();
    await user.save();

    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// RESEND OTP
// ---------------------------
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpire = otpExpireTime();
    await user.save();

    await sendEmail(email, "New OTP Code", `Your OTP is: ${otp}`);

    res.json({ message: "New OTP sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// RESET PASSWORD
// ---------------------------
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpire < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
