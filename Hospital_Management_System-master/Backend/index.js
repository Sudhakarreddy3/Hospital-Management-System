const express = require("express");
const { connection } = require("./configs/db");
require("dotenv").config();
const cors = require("cors");

// Import all models to ensure they are registered with Sequelize
const { AdminModel } = require("./models/Admin.model");
const { DoctorModel } = require("./models/Doctor.model");
const { PatientModel } = require("./models/Patient.model");
const { NurseModel } = require("./models/Nurse.model");
const { AppointmentModel } = require("./models/Appointment.model");
const { BedModel } = require("./models/Bed.model");
const { HospitalModel } = require("./models/Hospital.model");
const { AmbulanceModel } = require("./models/Ambulance.model");
const { PaymentModel } = require("./models/Payment.model");
const { PrescriptionModel } = require("./models/Prescription.model");
const { ReportModel } = require("./models/Report.model");

// Set up associations
const { setupAssociations } = require("./associations");

const adminRouter = require("./routes/Admins.Route");
const ambulanceRouter = require("./routes/Ambulances.Route");
const appointmentRouter = require("./routes/Appointments.Route");
const bedRouter = require("./routes/Beds.Route");
const doctorRouter = require("./routes/Doctors.Route");
const hospitalRouter = require("./routes/Hospitals.Route");
const nurseRouter = require("./routes/Nurses.Route");
const patientRouter = require("./routes/Patients.Route");
const paymentRouter = require("./routes/Payments.route");
const prescriptionRouter = require("./routes/Prescriptions.Route");
const reportRouter = require("./routes/Reports.Route");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hospital Management System API is running!");
});

app.use("/admin", adminRouter);
app.use("/ambulances", ambulanceRouter);
app.use("/appointments", appointmentRouter);
app.use("/beds", bedRouter);
app.use("/doctors", doctorRouter);
app.use("/hospitals", hospitalRouter);
app.use("/nurses", nurseRouter);
app.use("/patients", patientRouter);
app.use("/payments", paymentRouter);
app.use("/prescriptions", prescriptionRouter);
app.use("/reports", reportRouter);

const PORT = process.env.port || 5000;

app.listen(PORT, async () => {
  try {
    // Set up associations first
    setupAssociations();
    // Then connect to database
    await connection();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log("Unable to start server");
    console.log(error);
  }
});
