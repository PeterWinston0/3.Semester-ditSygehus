const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');

// Create a new department for a hospital
router.post('/:hospitalId/departments', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospitalId);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    const newDepartment = req.body;
    hospital.departments.push(newDepartment);
    await hospital.save();

    res.status(201).json(hospital.departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all departments of a hospital
router.get('/:hospitalId/departments', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospitalId);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    res.json(hospital.departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific department of a hospital
router.get('/:hospitalId/departments/:departmentId', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospitalId);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    const department = hospital.departments.id(req.params.departmentId);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific department of a hospital
router.put('/:hospitalId/departments/:departmentId', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospitalId);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    const department = hospital.departments.id(req.params.departmentId);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    Object.assign(department, req.body);
    await hospital.save();

    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific department of a hospital
router.delete('/:hospitalId/departments/:departmentId', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospitalId);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    hospital.departments.pull(req.params.departmentId); // Remove the department from the departments array
    await hospital.save();

    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;