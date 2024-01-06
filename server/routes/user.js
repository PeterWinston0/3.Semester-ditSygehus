const express = require("express");
const router = express.Router();
const User = require("../models/user");

const bcrypt = require("bcrypt");


router.get("/users/count", async (req, res) => {
  try {
    const maleCount = await User.countDocuments({ gender: "male" });
    const femaleCount = await User.countDocuments({ gender: "female" });

    res.json({ maleCount, femaleCount });
  } catch (err) {
    console.error("Error in /api/users/count route:", err); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || "user", // Default role is 'user' if not provided
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific user by ID
router.get("/users/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Update a user by ID
router.patch("/users/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.role != null) {
    res.user.role = req.body.role;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user by ID
router.delete("/users/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

router.post("/users/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      jobTitle: req.body.jobTitle,
      ssn: req.body.ssn,
      hospitalId: req.body.hospitalId,
      departmentId: req.body.departmentId,
      gender: req.body.gender,
      role: req.body.role,
      
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get the details of the logged-in user
router.get("/user/me", async (req, res) => {
  // Assuming you have some method of authentication to get the user ID
  try {
    const userId = req.userId; // Replace with actual logic to get user ID from the request
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
