const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital");
const Patient = require("../models/patient");
const Queue = require("../models/queue");

router.get("/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find({});
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/patients", async (req, res) => {
  try {
    const { ssn, hospitalId, phoneNumber, description } = req.body;
    if (!hospitalId) {
      return res.status(400).json({ error: "Hospital not selected" });
    }

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    const newPatient = new Patient({ ssn, hospital, phoneNumber, description });
    await newPatient.save();

    const queueLength = await Queue.countDocuments({ hospital: hospitalId });
    const estimatedWaitTime = queueLength * 10;
    const queueNumber = queueLength + 1;

    const queue = new Queue({
      patient: newPatient._id,
      hospital: hospitalId,
      queueNumber,
      estimatedWaitTime,
    });
    await queue.save();

    res.status(201).json({
      message: "Patient added to queue",
      queueNumber,
      estimatedWaitTime,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/queue-info/:hospitalId", async (req, res) => {
  try {
    const hospitalId = req.params.hospitalId;
    const queueItems = await Queue.find({ hospital: hospitalId })
      .populate("patient") // Populate the patient data
      .exec();

    const queueInfo = queueItems.map((item) => ({
      queueNumber: item.queueNumber,
      patientSSN: item.patient.ssn, // Extract the SSN from the populated patient data
      estimatedWaitTime: item.estimatedWaitTime,
    }));

    res.json(queueInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a patient from the queue using queueNumber as the parameter
router.delete("/queue/:queueNumber", async (req, res) => {
  try {
    const queueNumber = req.params.queueNumber;
    const queueItem = await Queue.findOne({ queueNumber });

    if (!queueItem) {
      return res.status(404).json({ error: "Queue item not found" });
    }

    // Delete the queue item
    await Queue.findByIdAndRemove(queueItem._id);

    // Update remaining queue items
    const remainingQueueItems = await Queue.find({
      hospital: queueItem.hospital,
      queueNumber: { $gt: queueItem.queueNumber },
    });

    for (const item of remainingQueueItems) {
      item.queueNumber -= 1;
      item.estimatedWaitTime = Math.max(0, item.estimatedWaitTime - 10); // Assuming 10 min per patient
      await item.save();
    }

    res.json({ message: "Patient removed from queue" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
