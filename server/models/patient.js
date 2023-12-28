const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  ssn: {
    type: String,
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Add other fields specific to your patient model here
});

module.exports = mongoose.model('Patient', patientSchema);
