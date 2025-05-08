// // routes/auth.js
// import express from "express";
// const router = express.Router();
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { body, validationResult } from "express-validator";
// import rateLimit from "express-rate-limit";

// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 50,
//   message: "Too many attempts, please try again later",
// });

// const validateRegister = [
//   body("name")
//     .trim()
//     .notEmpty()
//     .withMessage("Name is required")
//     .isLength({ min: 2 })
//     .withMessage("Name must be at least 2 characters")
//     .escape(),
//   body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
//   body("phone").isMobilePhone().withMessage("Invalid phone number"),
//   body("password")
//     .isLength({ min: 8 })
//     .withMessage("Password must be at least 8 characters")
//     .matches(/[0-9]/)
//     .withMessage("Password must contain a number")
//     .matches(/[a-z]/)
//     .withMessage("Password must contain a lowercase letter")
//     .matches(/[A-Z]/)
//     .withMessage("Password must contain an uppercase letter")
//     .escape(),
//   body("confirmPassword").custom((value, { req }) => {
//     if (value !== req.body.password) {
//       throw new Error("Passwords do not match");
//     }
//     return true;
//   }),
// ];

// const validateLogin = [
//   body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
//   body("password").notEmpty().withMessage("Password is required"),
// ];

// const verifySession = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Not authenticated" });
//     }
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded.userId);
//       if (!user) {
//         return res
//           .status(401)
//           .json({ success: false, message: "User no longer exists" });
//       }
//       req.user = user;
//       next();
//     } catch (jwtErr) {
//       console.error("JWT Verification Error:", jwtErr); // Added specific error logging
//       return res
//         .status(401)
//         .json({ success: false, message: "Session verification failed" });
//     }
//   } catch (err) {
//     console.error("Session verification error:", err);
//     res
//       .status(401)
//       .json({ success: false, message: "Session verification failed" });
//   }
// };

// router.post("/register", authLimiter, validateRegister, async (req, res) => {
//   // ... (rest of your register route code remains the same)
// });

// router.post("/login", authLimiter, validateLogin, async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res
//         .status(400)
//         .json({ success: false, errors: errors.array().map((err) => err.msg) });
//     }
//     const { email, password } = req.body;
//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid email or password" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid email or password" });
//     }
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
//     );
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 3600000,
//       // domain: process.env.COOKIE_DOMAIN, // Commented out domain for local testing
//     });
//     res.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Login failed. Please try again." });
//   }
// });

// router.get("/profile", verifySession, (req, res) => {
//   res.json({ success: true, user: req.user });
// });

// router.post("/logout", (req, res) => {
//   res.clearCookie("token", { domain: process.env.COOKIE_DOMAIN });
//   res.json({ success: true, message: "Logged out successfully" });
// });

// export default router;

// import express from "express";
// const router = express.Router();
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { body, validationResult } from "express-validator";
// import rateLimit from "express-rate-limit";

// // Rate limiting for auth endpoints
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 50, // Limit each IP to 50 requests per windowMs
//   message: "Too many attempts, please try again later",
//   skipSuccessfulRequests: true, // Don't count successful requests
// });

// // Input validation for registration
// const validateRegister = [
//   body("name")
//     .trim()
//     .notEmpty()
//     .withMessage("Name is required")
//     .isLength({ min: 2 })
//     .withMessage("Name must be at least 2 characters")
//     .matches(/^[a-zA-Z\s]+$/)
//     .withMessage("Name can only contain letters and spaces")
//     .escape(),

//   body("email")
//     .trim()
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Invalid email format")
//     .normalizeEmail()
//     .custom(async (email) => {
//       const user = await User.findOne({ email });
//       if (user) {
//         throw new Error("Email already in use");
//       }
//     }),

//   body("phone")
//     .optional({ checkFalsy: true })
//     .trim()
//     .isMobilePhone()
//     .withMessage("Invalid phone number")
//     .custom(async (phone) => {
//       if (phone) {
//         const user = await User.findOne({ phone });
//         if (user) {
//           throw new Error("Phone number already in use");
//         }
//       }
//     }),

//   body("password")
//     .trim()
//     .notEmpty()
//     .withMessage("Password is required")
//     .isLength({ min: 8 })
//     .withMessage("Password must be at least 8 characters")
//     .matches(/[0-9]/)
//     .withMessage("Password must contain a number")
//     .matches(/[a-z]/)
//     .withMessage("Password must contain a lowercase letter")
//     .matches(/[A-Z]/)
//     .withMessage("Password must contain an uppercase letter")
//     .matches(/[@$!%*?&]/)
//     .withMessage("Password must contain a special character"),

//   body("confirmPassword")
//     .trim()
//     .notEmpty()
//     .withMessage("Please confirm your password")
//     .custom((value, { req }) => {
//       if (value !== req.body.password) {
//         throw new Error("Passwords do not match");
//       }
//       return true;
//     }),
// ];

// // Input validation for login
// const validateLogin = [
//   body("email")
//     .trim()
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Invalid email format")
//     .normalizeEmail(),

//   body("password").trim().notEmpty().withMessage("Password is required"),
// ];

// // Session verification middleware
// const verifySession = async (req, res, next) => {
//   try {
//     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authenticated",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User no longer exists",
//       });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("Session verification error:", err);

//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({
//         success: false,
//         message: "Session expired. Please log in again.",
//       });
//     }

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// // Registration endpoint
// router.post("/register", authLimiter, validateRegister, async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array(),
//       });
//     }

//     const { name, email, phone, password } = req.body;

//     // Hash password
//     const salt = await bcrypt.genSalt(12);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user
//     const user = new User({
//       name,
//       email: email.toLowerCase(),
//       phone: phone || undefined,
//       password: hashedPassword,
//     });

//     await user.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
//     );

//     // Set HTTP-only cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 3600000, // 1 hour
//     });

//     // Return success response
//     res.status(201).json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Registration failed. Please try again.",
//     });
//   }
// });

// // Login endpoint
// router.post("/login", authLimiter, validateLogin, async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array(),
//       });
//     }

//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email.toLowerCase() }).select(
//       "+password"
//     );

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
//     );

//     // Set HTTP-only cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 3600000, // 1 hour
//     });

//     // Return success response
//     res.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Login failed. Please try again.",
//     });
//   }
// });

// // Profile endpoint
// router.get("/profile", verifySession, (req, res) => {
//   res.json({
//     success: true,
//     user: req.user,
//   });
// });

// // Logout endpoint
// router.post("/logout", (req, res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   });
//   res.json({
//     success: true,
//     message: "Logged out successfully",
//   });
// });

// export default router;

// import express from "express";
// const router = express.Router();
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { body, validationResult } from "express-validator";
// import rateLimit from "express-rate-limit";

// // Enhanced rate limiting configuration
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 50,
//   message: {
//     success: false,
//     error: "Too many attempts, please try again later",
//   },
//   skipSuccessfulRequests: true,
//   handler: (req, res) => {
//     res.status(429).json({
//       success: false,
//       error: "Too many attempts, please try again later",
//     });
//   },
// });

// // Strict input validation for registration
// const validateRegister = [
//   body("name")
//     .trim()
//     .notEmpty()
//     .withMessage("Name is required")
//     .isLength({ min: 2 })
//     .withMessage("Name must be at least 2 characters")
//     .matches(/^[a-zA-Z\s]+$/)
//     .withMessage("Name can only contain letters and spaces")
//     .escape(),

//   body("email")
//     .trim()
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Invalid email format")
//     .normalizeEmail()
//     .custom(async (email) => {
//       const user = await User.findOne({ email });
//       if (user) throw new Error("Email already in use");
//     }),

//   body("phone")
//     .optional({ checkFalsy: true })
//     .trim()
//     .isMobilePhone()
//     .withMessage("Invalid phone number")
//     .custom(async (phone) => {
//       if (phone) {
//         const user = await User.findOne({ phone });
//         if (user) throw new Error("Phone number already in use");
//       }
//     }),

//   body("password")
//     .trim()
//     .notEmpty()
//     .withMessage("Password is required")
//     .isLength({ min: 8 })
//     .withMessage("Password must be at least 8 characters")
//     .matches(/[0-9]/)
//     .withMessage("Password must contain a number")
//     .matches(/[a-z]/)
//     .withMessage("Password must contain a lowercase letter")
//     .matches(/[A-Z]/)
//     .withMessage("Password must contain an uppercase letter")
//     .matches(/[@$!%*?&]/)
//     .withMessage("Password must contain a special character"),

//   body("confirmPassword")
//     .trim()
//     .notEmpty()
//     .withMessage("Please confirm your password")
//     .custom((value, { req }) => {
//       if (value !== req.body.password) {
//         throw new Error("Passwords do not match");
//       }
//       return true;
//     }),
// ];

// // Login validation
// const validateLogin = [
//   body("email")
//     .trim()
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Invalid email format")
//     .normalizeEmail(),

//   body("password").trim().notEmpty().withMessage("Password is required"),
// ];

// // Enhanced session verification middleware
// const verifySession = async (req, res, next) => {
//   try {
//     const token =
//       req.cookies.token ||
//       req.headers.authorization?.split(" ")[1] ||
//       req.body.token;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         error: "Authentication required",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select("-password -__v");

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         error: "User account not found",
//       });
//     }

//     // Add user session information
//     req.user = {
//       ...user.toObject(),
//       sessionIssued: new Date(decoded.iat * 1000),
//       sessionExpires: new Date(decoded.exp * 1000),
//     };

//     // Set fresh token if nearing expiration
//     const now = Date.now() / 1000;
//     if (decoded.exp - now < 1800) {
//       // Refresh if < 30 minutes remaining
//       const newToken = jwt.sign(
//         { userId: user._id, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
//       );
//       res.cookie("token", newToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 3600000,
//       });
//     }

//     next();
//   } catch (err) {
//     console.error("Session verification error:", err);

//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({
//         success: false,
//         error: "Session expired. Please log in again.",
//       });
//     }

//     return res.status(401).json({
//       success: false,
//       error: "Invalid authentication token",
//     });
//   }
// };

// // User Registration
// router.post("/register", authLimiter, validateRegister, async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array(),
//       });
//     }

//     const { name, email, phone, password } = req.body;

//     // Secure password hashing
//     const salt = await bcrypt.genSalt(12);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = new User({
//       name,
//       email: email.toLowerCase(),
//       phone: phone || undefined,
//       password: hashedPassword,
//     });

//     await user.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
//     );

//     // Secure cookie settings
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 3600000,
//       path: "/",
//     });

//     // Successful response
//     res.status(201).json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({
//       success: false,
//       error: "Registration failed. Please try again.",
//     });
//   }
// });

// // User Login
// router.post("/login", authLimiter, validateLogin, async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array(),
//       });
//     }

//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email.toLowerCase() }).select(
//       "+password +loginAttempts +lockedUntil"
//     );

//     // Account lock check
//     if (user?.lockedUntil && user.lockedUntil > Date.now()) {
//       const remainingTime = Math.ceil((user.lockedUntil - Date.now()) / 60000);
//       return res.status(403).json({
//         success: false,
//         error: `Account temporarily locked. Try again in ${remainingTime} minute(s).`,
//       });
//     }

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         error: "Invalid email or password",
//       });
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       // Increment failed attempts
//       await User.findByIdAndUpdate(user._id, {
//         $inc: { loginAttempts: 1 },
//         ...(user.loginAttempts + 1 >= 5
//           ? {
//               lockedUntil: Date.now() + 30 * 60 * 1000, // Lock for 30 minutes
//             }
//           : {}),
//       });

//       const attemptsLeft = 5 - (user.loginAttempts + 1);
//       return res.status(401).json({
//         success: false,
//         error: `Invalid email or password. ${
//           attemptsLeft > 0
//             ? `${attemptsLeft} attempt(s) remaining`
//             : "Account locked for 30 minutes"
//         }`,
//       });
//     }

//     // Reset login attempts on successful login
//     await User.findByIdAndUpdate(user._id, {
//       loginAttempts: 0,
//       lockedUntil: null,
//     });

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
//     );

//     // Set secure cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 3600000,
//       path: "/",
//     });

//     // Successful response
//     res.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//       token,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({
//       success: false,
//       error: "Login failed. Please try again.",
//     });
//   }
// });

// // User Profile
// router.get("/profile", verifySession, (req, res) => {
//   res.json({
//     success: true,
//     user: req.user,
//   });
// });

// // User Logout
// router.post("/logout", (req, res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     path: "/",
//   });
//   res.json({
//     success: true,
//     message: "Logged out successfully",
//   });
// });

// export default router;

// import express from "express";
// const router = express.Router();
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { body, validationResult } from "express-validator";
// import rateLimit from "express-rate-limit";

// // 1. Enhanced Rate Limiting
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 50,
//   handler: (req, res) => {
//     res.status(429).json({
//       success: false,
//       error: "Too many attempts, please try again later",
//     });
//   },
// });

// // 2. Strict Input Validation
// const validateRegister = [
//   body("name").trim().notEmpty().withMessage("Name is required"),
//   body("email").isEmail().normalizeEmail(),
//   body("password").isLength({ min: 8 }),
// ];

// const validateLogin = [
//   body("email").isEmail().normalizeEmail(),
//   body("password").notEmpty(),
// ];

// // 3. Robust Session Verification
// const verifySession = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ error: "Unauthorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.userId);
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// // 4. Secure Registration Endpoint
// router.post("/register", authLimiter, validateRegister, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 12);
//     const user = await User.create({
//       ...req.body,
//       password: hashedPassword,
//     });

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 3600000,
//     });

//     res.status(201).json({ user, token });
//   } catch (err) {
//     res.status(500).json({ error: "Registration failed" });
//   }
// });

// // 5. Reliable Login Endpoint
// router.post("/login", authLimiter, validateLogin, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(401).json({ error: "Invalid credentials" });

//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!validPassword)
//       return res.status(401).json({ error: "Invalid credentials" });

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 3600000,
//     });

//     res.json({ user, token });
//   } catch (err) {
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// // 6. Error Handling Middleware
// router.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal server error" });
// });

// export default router;

import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import slowDown from "express-slow-down";

// 1. Security Middleware
router.use(helmet());
router.use(express.json({ limit: "10kb" })); // Prevent JSON overflow

// 2. Enhanced Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: "Too many attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

// 3. Speed Limiting (Slows down after 5 quick attempts)
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 5,
  delayMs: 100,
});

// 4. Strict Input Validation
const validateRegister = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name too long"),

  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("Email already in use");
    }),

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
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
];

// 5. Session Management
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: parseInt(process.env.JWT_COOKIE_EXPIRES_IN) || 3600000,
  });
};

// 6. Secure Registration Endpoint
router.post(
  "/register",
  [authLimiter, speedLimiter, ...validateRegister],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array().map((err) => ({
            field: err.param,
            message: err.msg,
          })),
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      const token = createToken(user._id);
      setTokenCookie(res, token);

      // Remove password from output
      user.password = undefined;

      res.status(201).json({
        success: true,
        user,
        token,
      });
    } catch (err) {
      next(err);
    }
  }
);

// 7. Reliable Login Endpoint
router.post(
  "/login",
  [authLimiter, speedLimiter, ...validateLogin],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const user = await User.findOne({ email: req.body.email }).select(
        "+password"
      );
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password",
        });
      }

      const token = createToken(user._id);
      setTokenCookie(res, token);

      // Remove password from output
      user.password = undefined;

      res.json({
        success: true,
        user,
        token,
      });
    } catch (err) {
      next(err);
    }
  }
);

// 8. Logout Endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
});

// 9. Protected Test Route
router.get("/protected", verifySession, (req, res) => {
  res.json({
    success: true,
    message: "Access granted to protected route",
    user: req.user,
  });
});

// 10. Enhanced Session Verification Middleware
async function verifySession(req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Not authorized, no token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Not authorized, token failed",
    });
  }
}

// 11. Centralized Error Handling
router.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      error: "Invalid token",
    });
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  // Default error handler
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

export default router;
