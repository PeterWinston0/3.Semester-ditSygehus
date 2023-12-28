const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  // Add fields for managing the queue status and estimated wait time, if needed
});

module.exports = mongoose.model('Queue', queueSchema);
