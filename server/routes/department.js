const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');

router.post('/:hospitalId/departments', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospitalId);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    const { name } = req.body;
    const newDepartment = { name };
    
    const department = await hospital.departments.create(newDepartment);
    hospital.departments.push(department);
    await hospital.save();

    res.status(201).json({ departmentId: department._id });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Error creating department' });
  }
});

router.post('/:hospitalId/departments/:departmentId/sections', async (req, res) => {
  try {
    const { hospitalId, departmentId } = req.params;
    const { name, description, contactName, phoneNumber, numberOfEmployees } = req.body;

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    const department = hospital.departments.id(departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const newSection = {
      name,
      description,
      contactName,
      phoneNumber,
      numberOfEmployees,
    };

    department.sections.push(newSection);
    await hospital.save();

    res.status(201).json(newSection);
  } catch (error) {
    res.status(500).json({ message: error.message });
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