// routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/authController.js";
import { body } from "express-validator";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limiting configuration (prevents brute force attacks)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: {
    success: false,
    error: "Too many attempts, please try again later",
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable deprecated headers
});

// Input validation middleware
const validateRegister = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),

  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

const validateLogin = [
  body("emailOrPhone")
    .notEmpty()
    .withMessage("Email or phone is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Apply rate limiting and validation to routes
router.post("/register", authLimiter, validateRegister, register);
router.post("/login", authLimiter, validateLogin, login);

export default router;
