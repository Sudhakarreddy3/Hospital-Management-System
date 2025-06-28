const { connection } = require("./configs/db");
const { DoctorModel } = require("./models/Doctor.model");

const createInitialDoctor = async () => {
  try {
    await connection();
    
    // Check if doctor already exists
    const existingDoctor = await DoctorModel.findOne({
      where: { email: "doctor@hospital.com" }
    });
    
    if (existingDoctor) {
      console.log("Doctor already exists!");
      return;
    }
    
    // Create initial doctor user
    const doctorData = {
      userType: "doctor",
      docID: 2001,
      docName: "Dr. John Smith",
      email: "doctor@hospital.com",
      password: "doctor123", // You can change this password
      mobile: "9876543210",
      age: 40,
      gender: "Male",
      bloodGroup: "O+",
      DOB: "1983-05-15",
      address: "123 Medical Center Dr, City",
      education: "MBBS, MD - Cardiology",
      department: "Cardiology",
      image: "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
      details: "Experienced cardiologist with 15+ years of practice"
    };
    
    const doctor = await DoctorModel.create(doctorData);
    console.log("Initial doctor created successfully!");
    console.log("Email: doctor@hospital.com");
    console.log("Password: doctor123");
    console.log("Doctor ID: 2001");
    
  } catch (error) {
    console.error("Error creating doctor:", error);
  } finally {
    process.exit(0);
  }
};

createInitialDoctor(); 