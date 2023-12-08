const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  profilePicture: {
    type: String, // Storing the path or URL to the profile picture
    default: '/default-profile-picture.jpg' // You can set a default picture here if needed
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);