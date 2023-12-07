const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set your destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames
  },
});

const upload = multer({ storage });

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};


// Update user profile picture
router.post('/user/profile-picture', verifyToken, upload.single('profilePicture'), async (req, res) => {
    const userId = req.user.id;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.profilePicture = req.file.path; // Save the path to the profile picture in the User model
      await user.save();
  
      res.json({ message: 'Profile picture updated' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// Fetch user profile details
router.get('/user/profile', verifyToken, async (req, res) => {
  const userId = req.user.id; // Assuming the user ID is stored in the token payload

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with user profile data
    res.json({
      name: user.name,
      email: user.email,
      // Add other necessary profile information here
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/user/profile', verifyToken, async (req, res) => {
  const userId = req.user.id; // Assuming the user ID is stored in the token payload

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the updated user profile
    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      // Add other necessary updated profile information here
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user profile
router.delete('/user/profile', verifyToken, async (req, res) => {
  const userId = req.user.id; // Assuming the user ID is stored in the token payload

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User profile deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');

// // Middleware for token verification
// const verifyToken = (req, res, next) => {
//   const token = req.header('auth-token');
//   if (!token) return res.status(401).send('Access Denied');

//   try {
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send('Invalid Token');
//   }
// };

// // Fetch user profile details
// router.get('/user/profile', verifyToken, async (req, res) => {
//   const userId = req.user.id; // Assuming the user ID is stored in the token payload

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Respond with user profile data
//     res.json({
//       name: user.name,
//       email: user.email,
//       // Add other necessary profile information here
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Update user profile
// router.patch('/user/profile', verifyToken, async (req, res) => {
//   const userId = req.user.id; // Assuming the user ID is stored in the token payload

//   try {
//     const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Respond with the updated user profile
//     res.json({
//       name: updatedUser.name,
//       email: updatedUser.email,
//       // Add other necessary updated profile information here
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Delete user profile
// router.delete('/user/profile', verifyToken, async (req, res) => {
//   const userId = req.user.id; // Assuming the user ID is stored in the token payload

//   try {
//     const deletedUser = await User.findByIdAndDelete(userId);

//     if (!deletedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json({ message: 'User profile deleted' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;
