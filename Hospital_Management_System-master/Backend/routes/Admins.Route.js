const express = require("express");
const { AdminModel } = require("../models/Admin.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { NurseModel } = require("../models/Nurse.model");
const { DoctorModel } = require("../models/Doctor.model");
const { PatientModel } = require("../models/Patient.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const admins = await AdminModel.findAll();
    res.status(200).send(admins);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await AdminModel.findOne({ where: { email } });
    if (admin) {
      return res.send({
        message: "Admin already exists",
      });
    }
    const value = await AdminModel.create(req.body);
    const data = await AdminModel.findOne({ where: { email } });
    return res.send({ data, message: "Registered" });
  } catch (error) {
    console.log(error);
    res.send({ message: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { adminID, password } = req.body;
  try {
    console.log("Admin login attempt:", { adminID, password });
    
    if (!adminID || !password) {
      return res.status(400).send({ message: "Admin ID and password are required" });
    }
    
    const admin = await AdminModel.findOne({ 
      where: { adminID, password } 
    });

    if (admin) {
      const token = jwt.sign({ foo: "bar" }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: "24h",
      });
      console.log("Admin login successful:", admin.adminName);
      res.send({ message: "Successful", user: admin, token: token });
    } else {
      console.log("Admin login failed: Wrong credentials");
      res.status(401).send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.patch("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    const admin = await AdminModel.findByPk(id);
    if (!admin) {
      return res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    await admin.update(payload);
    res.status(200).send(`Admin with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  try {
    const admin = await AdminModel.findByPk(id);
    if (!admin) {
      return res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    await admin.destroy();
    res.status(200).send(`Admin with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

router.post("/password", (req, res) => {
  const { email, userId, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agrawaljoy1@gmail.com",
      pass: "zxkyjqfuhiizmxrg",
    },
  });

  const mailOptions = {
    from: "agrawaljoy1@gmail.com",
    to: email,
    subject: "Account ID and Password",
    text: `This is your User Id : ${userId} and  Password : ${password} .`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(error);
    }
    return res.send("Password reset email sent");
  });
});

router.post("/forgot", async (req, res) => {
  const { email, type } = req.body;
  let user;
  let userId;
  let password;

  if (type == "nurse") {
    user = await NurseModel.findOne({ where: { email } });
    userId = user?.nurseID;
    password = user?.password;
  }
  if (type == "patient") {
    user = await PatientModel.findOne({ where: { email } });
    userId = user?.patientID;
    password = user?.password;
  }

  if (type == "admin") {
    user = await AdminModel.findOne({ where: { email } });
    userId = user?.adminID;
    password = user?.password;
  }

  if (type == "doctor") {
    user = await DoctorModel.findOne({ where: { email } });
    userId = user?.docID;
    password = user?.password;
  }

  if (!user) {
    return res.send({ message: "User not found" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agrawaljoy1@gmail.com",
      pass: "zxkyjqfuhiizmxrg",
    },
  });

  const mailOptions = {
    from: "agrawaljoy1@gmail.com",
    to: email,
    subject: "Account ID and Password",
    text: `This is your User Id : ${userId} and  Password : ${password} .`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(error);
    }
    return res.send("Password reset email sent");
  });
});

module.exports = router;
