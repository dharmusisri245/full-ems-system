import express from "express";
import {
  register,
  login,
  forgotPassword,
  resendOtp,
  resetPassword,
} from "../controllers/authController.js";

import upload from "../config/multer.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/resend-otp", resendOtp);
router.post("/reset-password", resetPassword);

export default router;
