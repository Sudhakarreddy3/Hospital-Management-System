const express = require("express");
const { PatientModel } = require("../models/Patient.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { ReportModel } = require("../models/Report.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patients = await PatientModel.findAll();
    res.status(200).send({ patients });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// This register route will be used when adding a patient via patient or doctor or admin
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const patient = await PatientModel.findOne({ where: { email } });
    if (patient) {
      return res.send({
        message: "Patient already exists",
        _id: patient.id,
        patientID: patient.patientID
      });
    }
    const newPatient = await PatientModel.create(req.body);
    res.send({ 
      message: "Patient added successfully",
      _id: newPatient.id,
      patientID: newPatient.patientID 
    });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

router.post("/login", async (req, res) => {
  const { patientID, password } = req.body;
  try {
    const patient = await PatientModel.findOne({ 
      where: { patientID, password } 
    });

    if (patient) {
      const token = jwt.sign({ foo: "bar" }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: "24h",
      });
      let email = patient.email;
      let report = await ReportModel.findAll({ where: { email } });
      res.send({
        message: "Login Successful.",
        user: patient,
        token: token,
        report,
      });
    } else {
      res.send({ message: "Wrong credentials, Please try again." });
    }
  } catch (error) {
    console.log({ message: "Error occurred, unable to Login." });
    console.log(error);
  }
});

// Only Admin should be able to update or delete patient
router.patch("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  const payload = req.body;
  try {
    const patient = await PatientModel.findByPk(id);
    if (!patient) {
      return res.status(404).send({ msg: `Patient with id ${id} not found` });
    }
    await patient.update(payload);
    res.status(200).send(`Patient with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  try {
    const patient = await PatientModel.findByPk(id);
    if (!patient) {
      return res.status(404).send({ msg: `Patient with id ${id} not found` });
    }
    await patient.destroy();
    res.status(200).send(`Patient with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
