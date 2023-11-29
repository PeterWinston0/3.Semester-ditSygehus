const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validation');

// User Registration
router.post("/register", async (req, res, next) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const userObject = new User({
    name: req.body.name,
    email: req.body.email,
    password,
    role: req.body.role || 'user', // Set default role if not provided
  });

  try {
    const savedUser = await userObject.save();
    res.json({
      error: null,
      data: {
        userId: savedUser._id,
        name: savedUser.name,
        role: savedUser.role,
      },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// User Login
router.post("/login", async (req, res, next) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ error: "Email or password is wrong" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({ error: "Email or password is wrong" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role, // Include role in the token payload
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.header("auth-token", token).json({
    error: null,
    data: {
      token,
      email: user.email,
      role: user.role,
    },
  });
});

// Token Verification Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ error: "Token is not valid" });
  }
};

module.exports = { router, verifyToken };