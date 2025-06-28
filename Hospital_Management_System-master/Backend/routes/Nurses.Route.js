const express = require("express");
const { NurseModel } = require("../models/Nurse.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const nurses = await NurseModel.findAll();
    res.status(200).send(nurses);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const nurse = await NurseModel.findOne({ where: { email } });
    if (nurse) {
      return res.send({
        message: "Nurse already exists",
      });
    }
    const value = await NurseModel.create(req.body);
    const data = await NurseModel.findOne({ where: { email } });
    return res.send({ data, message: "Registered" });
  } catch (error) {
    console.log(error);
    res.send({ message: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { nurseID, password } = req.body;
  try {
    console.log("Nurse login attempt:", { nurseID, password });
    
    if (!nurseID || !password) {
      return res.status(400).send({ message: "Nurse ID and password are required" });
    }
    
    const nurse = await NurseModel.findOne({ 
      where: { nurseID, password } 
    });

    if (nurse) {
      const token = jwt.sign({ foo: "bar" }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: "24h",
      });
      console.log("Nurse login successful:", nurse.nurseName);
      res.send({ message: "Successful", user: nurse, token: token });
    } else {
      console.log("Nurse login failed: Wrong credentials");
      res.status(401).send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.error("Nurse login error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.patch("/:nurseId", async (req, res) => {
  const id = req.params.nurseId;
  const payload = req.body;
  try {
    const nurse = await NurseModel.findByPk(id);
    if (!nurse) {
      return res.status(404).send({ message: `Nurse with id ${id} not found` });
    }
    await nurse.update(payload);
    res.status(200).send({ message: `Nurse Updated`, user: nurse });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:nurseId", async (req, res) => {
  const id = req.params.nurseId;
  try {
    const nurse = await NurseModel.findByPk(id);
    if (!nurse) {
      return res.status(404).send({ msg: `Nurse with id ${id} not found` });
    }
    await nurse.destroy();
    res.status(200).send(`Nurse with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
