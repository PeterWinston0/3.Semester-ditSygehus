const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital'); // Import the Hospital model

// Create a new hospital
router.post('/', async (req, res) => {
  try {
    const { name, address /* other fields */ } = req.body;
    const newHospital = new Hospital({ name, address /* other fields */ });
    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all hospitals
router.get('/', async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a hospital by ID
router.get('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a hospital by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, address /* other fields */ } = req.body;
    const updatedHospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      { name, address /* other fields */ },
      { new: true }
    );
    if (!updatedHospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }
    res.json(updatedHospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a hospital by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!deletedHospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }
    res.json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


// const express = require('express');
// const router = express.Router(); // Create a router instance

// // Create a new hospital
// app.post('/api/hospitals', async (req, res) => {
//     try {
//       const { name, address /* other fields */ } = req.body;
//       const newHospital = new Hospital({ name, address /* other fields */ });
//       const savedHospital = await newHospital.save();
//       res.status(201).json(savedHospital);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  
//   // Get all hospitals
//   app.get('/api/hospitals', async (req, res) => {
//     try {
//       const hospitals = await Hospital.find();
//       res.json(hospitals);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  
//   // Get a hospital by ID
//   app.get('/api/hospitals/:id', async (req, res) => {
//     try {
//       const hospital = await Hospital.findById(req.params.id);
//       if (!hospital) {
//         return res.status(404).json({ error: 'Hospital not found' });
//       }
//       res.json(hospital);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  
//   // Update a hospital by ID
//   app.put('/api/hospitals/:id', async (req, res) => {
//     try {
//       const { name, address /* other fields */ } = req.body;
//       const updatedHospital = await Hospital.findByIdAndUpdate(
//         req.params.id,
//         { name, address /* other fields */ },
//         { new: true }
//       );
//       if (!updatedHospital) {
//         return res.status(404).json({ error: 'Hospital not found' });
//       }
//       res.json(updatedHospital);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  
//   // Delete a hospital by ID
//   app.delete('/api/hospitals/:id', async (req, res) => {
//     try {
//       const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);
//       if (!deletedHospital) {
//         return res.status(404).json({ error: 'Hospital not found' });
//       }
//       res.json({ message: 'Hospital deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });