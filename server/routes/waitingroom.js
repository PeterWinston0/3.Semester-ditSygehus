const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital'); // Import the Hospital model
const Patient = require('../models/patient'); // Import the Patient model
const Queue = require('../models/queue'); // Import the Queue model

// Middleware to save the selected hospital's ID in the session
router.post('/save-hospital', async (req, res) => {
  const { hospitalId } = req.body;
  req.session.selectedHospitalId = hospitalId;
  res.status(200).json({ message: 'Selected hospital saved in session' });
});

// Create a new patient and add to the waiting room queue
router.post('/patients', async (req, res) => {
  try {
    const { ssn, phoneNumber, description } = req.body;

    // Retrieve the selected hospital's ID from the session
    const hospitalId = req.session.selectedHospitalId;

    if (!hospitalId) {
      return res.status(400).json({ error: 'Hospital not selected' });
    }

    // Find the hospital by ID
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    // Create a new patient record
    const newPatient = new Patient({ ssn, hospital, phoneNumber, description });

    // Save the patient record to the database
    await newPatient.save();

    // Add the patient to the waiting room queue
    const queue = new Queue({ patient: newPatient });
    await queue.save();

    res.status(201).json({ message: 'Patient created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get the waiting room queue
router.get('/waiting-room', async (req, res) => {
  try {
    // Retrieve the waiting room queue
    const queue = await Queue.find();

    res.json(queue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle other waiting room management actions like updating queue status, serving patients, etc.

module.exports = router;





// const express = require('express');
// const router = express.Router();
// const Hospital = require('../models/hospital'); // Import the Hospital model
// const Patient = require('../models/patient'); // Import the Patient model
// const Queue = require('../models/queue'); // Import the Queue model

// // Create a new patient and add to the waiting room queue
// router.post('/patients', async (req, res) => {
//   try {
//     const { ssn, hospitalId, phoneNumber, description } = req.body;

//     // Find the hospital by ID
//     const hospital = await Hospital.findById(hospitalId);

//     if (!hospital) {
//       return res.status(404).json({ error: 'Hospital not found' });
//     }

//     // Create a new patient record
//     const newPatient = new Patient({ ssn, hospital, phoneNumber, description });

//     // Save the patient record to the database
//     await newPatient.save();

//     // Add the patient to the waiting room queue
//     const queue = new Queue({ patient: newPatient });
//     await queue.save();

//     // Here, you can also save the selected hospital to the user's session or database.
//     // For example, if you are using 'express-session':
//     // req.session.selectedHospitalId = hospitalId;

//     res.status(201).json({ message: 'Patient created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get the waiting room queue
// router.get('/waiting-room', async (req, res) => {
//   try {
//     // Retrieve the waiting room queue (you need to implement this logic)
//     // You may want to return a list of patients in the queue along with their estimated wait times.
//     // You can calculate estimated wait times based on the order of patients in the queue.

//     const queue = await Queue.find();

//     res.json(queue);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Handle other waiting room management actions like updating queue status, serving patients, etc.

// module.exports = router;








// const express = require('express');
// const router = express.Router();
// const Hospital = require('../models/hospital'); // Import the Hospital model
// const Patient = require('../models/patient'); // Import the Patient model
// const Queue = require('../models/queue'); // Import the Queue model

// // Create a new patient and add to the waiting room queue
// router.post('/patients', async (req, res) => {
//   try {
//     const { ssn, hospitalId, phoneNumber, description } = req.body;

//     // Find the hospital by ID
//     const hospital = await Hospital.findById(hospitalId);

//     if (!hospital) {
//       return res.status(404).json({ error: 'Hospital not found' });
//     }

//     // Create a new patient record
//     const newPatient = new Patient({ ssn, hospital, phoneNumber, description });

//     // Save the patient record to the database
//     await newPatient.save();

//     // Add the patient to the waiting room queue
//     const queue = new Queue({ patient: newPatient });
//     await queue.save();

//     res.status(201).json({ message: 'Patient created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get the waiting room queue
// router.get('/waiting-room', async (req, res) => {
//   try {
//     // Retrieve the waiting room queue (you need to implement this logic)
//     // You may want to return a list of patients in the queue along with their estimated wait times.
//     // You can calculate estimated wait times based on the order of patients in the queue.

//     const queue = await Queue.find();

//     res.json(queue);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Handle other waiting room management actions like updating queue status, serving patients, etc.

// module.exports = router;
