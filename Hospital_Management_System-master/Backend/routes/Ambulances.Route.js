const express = require("express");
const { AmbulanceModel } = require("../models/Ambulance.model");

const router = express.Router();

// Get all ambulances
router.get("/", async (req, res) => {
  try {
    const ambulances = await AmbulanceModel.findAll();
    res.status(200).send(ambulances);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Add new ambulance
router.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const ambulance = await AmbulanceModel.create(payload);
    res.status(201).send({ message: "Ambulance Added Successfully", ambulance });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to add ambulance" });
  }
});

// Update ambulance
router.patch("/:ambulanceId", async (req, res) => {
  const id = req.params.ambulanceId;
  const payload = req.body;
  try {
    const ambulance = await AmbulanceModel.findByPk(id);
    if (!ambulance) {
      return res.status(404).send({ msg: `Ambulance with id ${id} not found` });
    }
    await ambulance.update(payload);
    res.status(200).send(`Ambulance with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

// Delete ambulance
router.delete("/:ambulanceId", async (req, res) => {
  const id = req.params.ambulanceId;
  try {
    const ambulance = await AmbulanceModel.findByPk(id);
    if (!ambulance) {
      return res.status(404).send({ msg: `Ambulance with id ${id} not found` });
    }
    await ambulance.destroy();
    res.status(200).send(`Ambulance with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
