const { connection } = require("./configs/db");
const { BedModel } = require("./models/Bed.model");
const { AmbulanceModel } = require("./models/Ambulance.model");
const { PatientModel } = require("./models/Patient.model");
const { AppointmentModel } = require("./models/Appointment.model");

const createSampleData = async () => {
  try {
    await connection();
    
    console.log("Creating sample data...");
    
    // Create sample beds
    const bedData = [
      { bedNumber: 101, roomNumber: 1, floor: 1, isOccupied: false },
      { bedNumber: 102, roomNumber: 1, floor: 1, isOccupied: false },
      { bedNumber: 201, roomNumber: 2, floor: 2, isOccupied: false },
      { bedNumber: 202, roomNumber: 2, floor: 2, isOccupied: false },
      { bedNumber: 301, roomNumber: 3, floor: 3, isOccupied: false },
      { bedNumber: 302, roomNumber: 3, floor: 3, isOccupied: false },
      { bedNumber: 401, roomNumber: 4, floor: 4, isOccupied: false },
      { bedNumber: 402, roomNumber: 4, floor: 4, isOccupied: false }
    ];
    
    for (const bed of bedData) {
      const existingBed = await BedModel.findOne({ where: { bedNumber: bed.bedNumber } });
      if (!existingBed) {
        await BedModel.create(bed);
        console.log(`Created bed ${bed.bedNumber}`);
      }
    }
    
    // Create sample ambulances
    const ambulanceData = [
      { ambulanceNumber: "AMB001", driverName: "John Driver", driverContact: "1234567890", isAvailable: true, location: "Main Gate" },
      { ambulanceNumber: "AMB002", driverName: "Mike Smith", driverContact: "2345678901", isAvailable: true, location: "Emergency Wing" },
      { ambulanceNumber: "AMB003", driverName: "David Wilson", driverContact: "3456789012", isAvailable: false, location: "On Call" }
    ];
    
    for (const ambulance of ambulanceData) {
      const existingAmbulance = await AmbulanceModel.findOne({ where: { ambulanceNumber: ambulance.ambulanceNumber } });
      if (!existingAmbulance) {
        await AmbulanceModel.create(ambulance);
        console.log(`Created ambulance ${ambulance.ambulanceNumber}`);
      }
    }
    
    // Create sample patients
    const patientData = [
      {
        userType: "patient",
        patientID: 4001,
        patientName: "Alice Johnson",
        mobile: "9876543210",
        email: "alice@example.com",
        password: "patient123",
        age: 35,
        department: "Cardiology",
        gender: "Female",
        bloodGroup: "A+",
        DOB: "1988-05-15",
        address: "123 Main St, City",
        disease: "Hypertension",
        details: "Patient with high blood pressure",
        admitted: true,
        date: new Date()
      },
      {
        userType: "patient",
        patientID: 4002,
        patientName: "Bob Smith",
        mobile: "8765432109",
        email: "bob@example.com",
        password: "patient123",
        age: 45,
        department: "Neurology",
        gender: "Male",
        bloodGroup: "O+",
        DOB: "1978-08-22",
        address: "456 Oak Ave, City",
        disease: "Migraine",
        details: "Patient with severe headaches",
        admitted: false,
        date: new Date()
      }
    ];
    
    for (const patient of patientData) {
      const existingPatient = await PatientModel.findOne({ where: { patientID: patient.patientID } });
      if (!existingPatient) {
        await PatientModel.create(patient);
        console.log(`Created patient ${patient.patientName}`);
      }
    }
    
    // Create sample appointments
    const appointmentData = [
      {
        userType: "patient",
        patientID: 4001,
        patientName: "Alice Johnson",
        mobile: "9876543210",
        email: "alice@example.com",
        address: "123 Main St, City",
        disease: "Hypertension",
        department: "Cardiology",
        time: "10:00 AM",
        date: "2024-01-15",
        age: 35,
        gender: "Female"
      },
      {
        userType: "patient",
        patientID: 4002,
        patientName: "Bob Smith",
        mobile: "8765432109",
        email: "bob@example.com",
        address: "456 Oak Ave, City",
        disease: "Migraine",
        department: "Neurology",
        time: "2:00 PM",
        date: "2024-01-16",
        age: 45,
        gender: "Male"
      }
    ];
    
    for (const appointment of appointmentData) {
      const existingAppointment = await AppointmentModel.findOne({ 
        where: { 
          patientID: appointment.patientID,
          date: appointment.date,
          time: appointment.time
        } 
      });
      if (!existingAppointment) {
        await AppointmentModel.create(appointment);
        console.log(`Created appointment for ${appointment.patientName}`);
      }
    }
    
    console.log("\n✅ Sample data created successfully!");
    console.log("Dashboard should now show active data.");
    
  } catch (error) {
    console.error("Error creating sample data:", error);
  } finally {
    process.exit(0);
  }
};

createSampleData(); 