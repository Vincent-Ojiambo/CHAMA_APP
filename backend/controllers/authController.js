// backend/controllers/authController.js
import User from "../models/User.js"; // Assuming User.js is also an ES Module
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

// Password complexity requirements
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const register = async (req, res) => {
  console.log('REGISTER BODY:', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('REGISTER VALIDATION ERRORS:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, password } = req.body;

  try {
    // Check if user with this email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email already exists", param: "email" }] });
    }

    // Check if user with this phone number already exists (if provided)
    if (phone) {
      user = await User.findOne({ phone });
      if (user) {
        return res
          .status(400)
          .json({
            errors: [{ msg: "Phone number already exists", param: "phone" }],
          });
      }
    }

    const newUser = new User({
      name,
      email,
      phone,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    // Generate JWT
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Make sure you have this in your .env file
      { expiresIn: "1h" }, // Token expiration time
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          success: true,
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: { message: "Server error during registration" } });
  }
};

// Login Controller
export const login = async (req, res) => {
  console.log('LOGIN BODY:', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { emailOrPhone, password } = req.body;

  try {
    // Check if user exists with the provided email or phone
    let user = await User.findOne({ $or: [
      { email: emailOrPhone.toLowerCase() },
      { phone: emailOrPhone }
    ] }).select('+password'); // Accepts either email or phone, and selects password

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials", param: "emailOrPhone" }] });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials", param: "password" }] });
    }

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: { message: "Server error during login" } });
  }
};
