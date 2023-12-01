const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Section Schema
const sectionSchema = new Schema({
  name: String,
  // Other section fields as needed
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
    max: 255
  },
  address: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  departments: [departmentSchema], // Array of departments within a hospital
  date: {
    type: Date,
    default: Date.now
  }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;




// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// let sectionSchema = new Schema({
//   name: String,
//   // Add other fields as needed for sections
// });

// let departmentSchema = new Schema({
//   name: String,
//   // Other department details if needed
// });

// let hospitalSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     min: 3,
//     max: 255
//   },
//   address: {
//     type: String,
//     required: true,
//     min: 6,
//     max: 255
//   },
//   departments: [departmentSchema], // Array of departments
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Hospital = mongoose.model('Hospital', hospitalSchema);
// module.exports = Hospital;





// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// let hospitalSchema = new Schema({
//   name: {
//     type: String, 
//     required: true,
//     min: 3,
//     max: 255
//   },
//   address: {
//     type: String, 
//     required: true,
//     min: 6,
//     max: 255
//   },
//   date: {
//     type: Date, 
//     default: Date.now
//   }
// });

// // module.exports = mongoose.model("Hospital", hospitalSchema);

// const Hospital = mongoose.model('Hospital', hospitalSchema);

// module.exports = Hospital;
