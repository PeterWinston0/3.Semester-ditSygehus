const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Article Schema
const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imagePath: { // New field to store the image path
    type: String,
    required: true,
  },
  hospitalId: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital', // Reference to the Hospital model if needed
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Department', // Reference to the Department model if needed
  },
});

// Create the Article model
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;