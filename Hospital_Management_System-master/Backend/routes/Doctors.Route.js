const express = require("express");
const { DoctorModel } = require("../models/Doctor.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const doctors = await DoctorModel.findAll();
    res.status(200).send(doctors);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const doctor = await DoctorModel.findOne({ where: { email } });
    if (doctor) {
      return res.send({
        message: "Doctor already exists",
      });
    }
    const value = await DoctorModel.create(req.body);
    const data = await DoctorModel.findOne({ where: { email } });
    return res.send({ data, message: "Registered" });
  } catch (error) {
    console.log(error);
    res.send({ message: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { docID, password } = req.body;
  try {
    console.log("Doctor login attempt:", { docID, password });
    
    if (!docID || !password) {
      return res.status(400).send({ message: "Doctor ID and password are required" });
    }
    
    const doctor = await DoctorModel.findOne({ 
      where: { docID, password } 
    });

    if (doctor) {
      const token = jwt.sign({ foo: "bar" }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: "24h",
      });
      console.log("Doctor login successful:", doctor.docName);
      res.send({ message: "Successful", user: doctor, token: token });
    } else {
      console.log("Doctor login failed: Wrong credentials");
      res.status(401).send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.error("Doctor login error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.patch("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  const payload = req.body;
  try {
    const doctor = await DoctorModel.findByPk(id);
    if (!doctor) {
      return res.status(404).send({ message: `Doctor with id ${id} not found` });
    }
    await doctor.update(payload);
    res.status(200).send({ message: `Doctor Updated`, user: doctor });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  try {
    const doctor = await DoctorModel.findByPk(id);
    if (!doctor) {
      return res.status(404).send({ msg: `Doctor with id ${id} not found` });
    }
    await doctor.destroy();
    res.status(200).send(`Doctor with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
