const express = require("express");
const { HospitalModel } = require("../models/Hospital.model");
const { AdminModel } = require("../models/Admin.model");
const { DoctorModel } = require("../models/Doctor.model");
const { NurseModel } = require("../models/Nurse.model");
const { PatientModel } = require("../models/Patient.model");
const { BedModel } = require("../models/Bed.model");
const { AmbulanceModel } = require("../models/Ambulance.model");
const { AppointmentModel } = require("../models/Appointment.model");
const { ReportModel } = require("../models/Report.model");

const router = express.Router();

// Get dashboard statistics
router.get("/", async (req, res) => {
  try {
    // Get counts for all entities
    const adminCount = await AdminModel.count();
    const doctorCount = await DoctorModel.count();
    const nurseCount = await NurseModel.count();
    const patientCount = await PatientModel.count();
    const bedCount = await BedModel.count();
    const ambulanceCount = await AmbulanceModel.count();
    const appointmentCount = await AppointmentModel.count();
    const reportCount = await ReportModel.count();

    const dashboardData = {
      admin: adminCount,
      doctor: doctorCount,
      nurse: nurseCount,
      patient: patientCount,
      bed: bedCount,
      ambulance: ambulanceCount,
      appointment: appointmentCount,
      report: reportCount
    };

    res.status(200).send(dashboardData);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Get hospital info
router.get("/info", async (req, res) => {
  try {
    const hospitals = await HospitalModel.findAll();
    res.status(200).send(hospitals);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Update hospital info
router.post("/", async (req, res) => {
  try {
    const hospital = await HospitalModel.create(req.body);
    res.status(201).send(hospital);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

module.exports = router;
