const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  queueNumber: {
    type: Number,
    required: true,
  },
  estimatedWaitTime: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Queue', queueSchema);