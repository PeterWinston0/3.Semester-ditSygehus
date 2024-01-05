const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital");

// GET sections of a department
router.get(
  "/:hospitalId/departments/:departmentId/sections",
  async (req, res) => {
    try {
      const { hospitalId, departmentId } = req.params;
      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      const department = hospital.departments.id(departmentId);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      res.json(department.sections);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// POST create a section in a department

router.post(
  "/:hospitalId/departments/:departmentId/sections",
  async (req, res) => {
    try {
      const { hospitalId, departmentId } = req.params;
      const { name, description, contactName, phoneNumber, numberOfEmployees } =
        req.body;

      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      const department = hospital.departments.id(departmentId);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
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
      console.error("Error adding section:", error);
      res.status(500).json({ message: "Error adding section" });
    }
  }
);

// PUT update a section in a department
router.put(
  "/:hospitalId/departments/:departmentId/sections/:sectionId",
  async (req, res) => {
    try {
      const { hospitalId, departmentId, sectionId } = req.params;
      const { name /* add other updated section fields */ } = req.body;

      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      const department = hospital.departments.id(departmentId);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      const sectionToUpdate = department.sections.id(sectionId);
      if (!sectionToUpdate) {
        return res.status(404).json({ message: "Section not found" });
      }

      sectionToUpdate.name = name; // Update other fields similarly
      await hospital.save();

      res.json({
        message: "Section updated successfully",
        updatedSection: sectionToUpdate,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// DELETE a section from a department
router.delete(
  "/:hospitalId/departments/:departmentId/sections/:sectionId",
  async (req, res) => {
    try {
      const { hospitalId, departmentId, sectionId } = req.params;

      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      const department = hospital.departments.id(departmentId);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      const sectionIndex = department.sections.findIndex(
        (section) => section._id.toString() === sectionId
      );
      if (sectionIndex === -1) {
        return res.status(404).json({ message: "Section not found" });
      }

      department.sections.splice(sectionIndex, 1);
      await hospital.save();

      res.json({ message: "Section deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// GET a specific section of a department
router.get(
  "/:hospitalId/departments/:departmentId/sections/:sectionId",
  async (req, res) => {
    try {
      const { hospitalId, departmentId, sectionId } = req.params;
      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      const department = hospital.departments.id(departmentId);
      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      const section = department.sections.id(sectionId);
      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }

      console.log("Section Data:", section); // Log the section data
      res.json(section);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
