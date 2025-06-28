const { connection } = require("./configs/db");
const { AdminModel } = require("./models/Admin.model");
const { DoctorModel } = require("./models/Doctor.model");
const { NurseModel } = require("./models/Nurse.model");
const { PatientModel } = require("./models/Patient.model");
const { BedModel } = require("./models/Bed.model");
const { AmbulanceModel } = require("./models/Ambulance.model");
const { AppointmentModel } = require("./models/Appointment.model");
const { PaymentModel } = require("./models/Payment.model");
const { PrescriptionModel } = require("./models/Prescription.model");
const { ReportModel } = require("./models/Report.model");

const viewAllData = async () => {
  try {
    await connection();
    
    console.log("\n" + "=".repeat(50));
    console.log("HOSPITAL MANAGEMENT SYSTEM DATABASE");
    console.log("=".repeat(50));
    
    // View Admins
    console.log("\n📋 ADMINS:");
    console.log("-".repeat(20));
    const admins = await AdminModel.findAll();
    admins.forEach(admin => {
      console.log(`ID: ${admin.adminID} | Name: ${admin.adminName} | Email: ${admin.email}`);
    });
    
    // View Doctors
    console.log("\n👨‍⚕️ DOCTORS:");
    console.log("-".repeat(20));
    const doctors = await DoctorModel.findAll();
    doctors.forEach(doctor => {
      console.log(`ID: ${doctor.docID} | Name: ${doctor.docName} | Department: ${doctor.department} | Email: ${doctor.email}`);
    });
    
    // View Nurses
    console.log("\n👩‍⚕️ NURSES:");
    console.log("-".repeat(20));
    const nurses = await NurseModel.findAll();
    nurses.forEach(nurse => {
      console.log(`ID: ${nurse.nurseID} | Name: ${nurse.nurseName} | Email: ${nurse.email}`);
    });
    
    // View Patients
    console.log("\n🏥 PATIENTS:");
    console.log("-".repeat(20));
    const patients = await PatientModel.findAll();
    patients.forEach(patient => {
      console.log(`ID: ${patient.patientID} | Name: ${patient.patientName} | Disease: ${patient.disease} | Email: ${patient.email}`);
    });
    
    // View Beds
    console.log("\n🛏️ BEDS:");
    console.log("-".repeat(20));
    const beds = await BedModel.findAll();
    beds.forEach(bed => {
      console.log(`Bed: ${bed.bedNumber} | Room: ${bed.roomNumber} | Floor: ${bed.floor} | Occupied: ${bed.isOccupied}`);
    });
    
    // View Ambulances
    console.log("\n🚑 AMBULANCES:");
    console.log("-".repeat(20));
    const ambulances = await AmbulanceModel.findAll();
    ambulances.forEach(ambulance => {
      console.log(`Number: ${ambulance.ambulanceNumber} | Driver: ${ambulance.driverName} | Available: ${ambulance.isAvailable}`);
    });
    
    // View Appointments
    console.log("\n📅 APPOINTMENTS:");
    console.log("-".repeat(20));
    const appointments = await AppointmentModel.findAll();
    appointments.forEach(appointment => {
      console.log(`Patient: ${appointment.patientName} | Date: ${appointment.date} | Time: ${appointment.time} | Department: ${appointment.department}`);
    });
    
    // View Payments
    console.log("\n💰 PAYMENTS:");
    console.log("-".repeat(20));
    const payments = await PaymentModel.findAll();
    payments.forEach(payment => {
      console.log(`Patient: ${payment.patientName} | Amount: $${payment.amount} | Status: ${payment.status} | Date: ${payment.paymentDate}`);
    });
    
    // View Prescriptions
    console.log("\n💊 PRESCRIPTIONS:");
    console.log("-".repeat(20));
    const prescriptions = await PrescriptionModel.findAll();
    prescriptions.forEach(prescription => {
      console.log(`Patient: ${prescription.patientName} | Doctor: ${prescription.doctorName} | Date: ${prescription.prescriptionDate}`);
    });
    
    // View Reports
    console.log("\n📊 REPORTS:");
    console.log("-".repeat(20));
    const reports = await ReportModel.findAll();
    reports.forEach(report => {
      console.log(`Patient: ${report.patientName} | Test: ${report.testType} | Status: ${report.status} | Date: ${report.testDate}`);
    });
    
    console.log("\n" + "=".repeat(50));
    console.log("DATABASE SUMMARY:");
    console.log("=".repeat(50));
    console.log(`Total Admins: ${admins.length}`);
    console.log(`Total Doctors: ${doctors.length}`);
    console.log(`Total Nurses: ${nurses.length}`);
    console.log(`Total Patients: ${patients.length}`);
    console.log(`Total Beds: ${beds.length}`);
    console.log(`Total Ambulances: ${ambulances.length}`);
    console.log(`Total Appointments: ${appointments.length}`);
    console.log(`Total Payments: ${payments.length}`);
    console.log(`Total Prescriptions: ${prescriptions.length}`);
    console.log(`Total Reports: ${reports.length}`);
    console.log("=".repeat(50));
    
  } catch (error) {
    console.error("Error viewing data:", error);
  } finally {
    process.exit(0);
  }
};

viewAllData(); 