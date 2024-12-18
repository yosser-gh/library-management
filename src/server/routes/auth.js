const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const router = express.Router();
require('dotenv').config();


// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter verification failed:", error);
  } else {
    console.log("Transporter verified and ready to send emails", success);
  }
});

  
  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

// Signup Route
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 7200000 // 1 hour expiry
    });
    await newUser.save();
  
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification OTP',
        text: `Your OTP is: ${otp}`
      });
    } catch (error) {
      console.error("Error sending email:", error);
      await User.deleteOne({ _id: newUser._id });
      return res.status(500).json({ message: "Error sending verification email." });
    }
  
    res.status(201).json({ message: "Signup successful. Check your email for OTP." });
  });


// Verify OTP Route
router.post("/verify-signup", async (req, res) => {
    const { otp } = req.body;
    
    const user = await User.findOne({ 
      otp, 
      otpExpires: { $gt: Date.now() } 
    });
  
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }
  
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
  
    res.status(200).json({ message: "Email verified successfully." });
  });


// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token, role: user.role });
});

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized." });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token." });
    req.user = user;
    next();
  });
};

module.exports = { router, verifyToken };
