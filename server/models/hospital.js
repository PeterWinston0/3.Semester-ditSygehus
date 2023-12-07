
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Section Schema
const sectionSchema = new Schema({
  name: String,
  description: String,
  contactName: String,
  phoneNumber: String,
  numberOfEmployees: Number, // Add numberOfEmployees field for each section
  // Add other fields as needed for the section
});

// Define Department Schema
const departmentSchema = new Schema({
  name: String,
  sections: [sectionSchema], // Array of sections within a department
  // Other department details if needed
});

// Define Hospital Schema
const hospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  address: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  departments: [departmentSchema], // Array of departments within a hospital
  date: {
    type: Date,
    default: Date.now,
  },
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;