const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let hospitalSchema = new Schema({
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
  date: {
    type: Date, 
    default: Date.now
  }
});

// module.exports = mongoose.model("Hospital", hospitalSchema);

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
