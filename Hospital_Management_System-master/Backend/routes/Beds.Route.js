const express = require("express");
const { BedModel } = require("../models/Bed.model");
const { PatientModel } = require("../models/Patient.model");

const router = express.Router();

// Get all beds
router.get("/", async (req, res) => {
  try {
    const beds = await BedModel.findAll({
      include: [
        {
          model: PatientModel,
          as: 'patient',
          attributes: ['id', 'patientID', 'patientName', 'disease', 'age', 'gender']
        }
      ]
    });
    res.status(200).send(beds);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Get single bed
router.post("/single", async (req, res) => {
  const { bedNumber, roomNumber } = req.body;
  try {
    const bed = await BedModel.findOne({ 
      where: { bedNumber, roomNumber } 
    });
    
    if (!bed) {
      return res.send({ message: "Bed not found" });
    }
    
    if (bed.occupied === "available") {
      return res.send({ message: "Available", id: bed.id });
    }
    return res.send({ message: "Occupied" });
  } catch (error) {
    res.send({ message: "No Bed", error });
  }
});

// Add new bed
router.post("/add", async (req, res) => {
  const { bedNumber, roomNumber } = req.body;

  try {
    const existingBed = await BedModel.findOne({ 
      where: { bedNumber, roomNumber } 
    });
    
    if (existingBed) {
      return res.send({ message: "Bed already present" });
    } else {
      const bed = await BedModel.create(req.body);
      return res.send({ message: "Bed added successfully", bed });
    }
  } catch (error) {
    console.log(error);
    res.send("Something went wrong, unable to add Bed.");
  }
});

// Update bed
router.patch("/:bedId", async (req, res) => {
  const id = req.params.bedId;
  const payload = req.body;
  try {
    const bed = await BedModel.findByPk(id);
    if (!bed) {
      return res.status(404).send({ msg: `Bed with id ${id} not found` });
    }
    await bed.update(payload);
    return res.status(200).send(`Bed with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

// Discharge patient from bed
router.put("/discharge", async (req, res) => {
  const { _id } = req.body;
  try {
    const bed = await BedModel.findByPk(_id);
    if (!bed) {
      return res.status(404).send({ message: `Bed not found` });
    }
    
    await bed.update({
      occupied: "available",
      patientID: null
    });
    
    const updatedBed = await BedModel.findByPk(_id);
    return res.status(200).send({ message: "Bed updated", bed: updatedBed });
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
});

// Delete bed
router.delete("/:bedId", async (req, res) => {
  const id = req.params.bedId;
  try {
    const bed = await BedModel.findByPk(id);
    if (!bed) {
      return res.status(404).send({ msg: `Bed with id ${id} not found` });
    }
    await bed.destroy();
    res.status(200).send(`Bed with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
