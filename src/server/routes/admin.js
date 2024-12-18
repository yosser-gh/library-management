const express = require("express");
const { verifyToken } = require("./auth");
const router = express.Router();

// Ensure admin role
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};

router.use(verifyToken, isAdmin);

// Admin actions here
router.get("/dashboard", (req, res) => {
  res.status(200).json({ message: "Admin dashboard accessed." });
});

module.exports = router;
