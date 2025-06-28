const { connection } = require("./configs/db");
const { NurseModel } = require("./models/Nurse.model");

const createInitialNurse = async () => {
  try {
    await connection();
    
    // Check if nurse already exists
    const existingNurse = await NurseModel.findOne({
      where: { email: "nurse@hospital.com" }
    });
    
    if (existingNurse) {
      console.log("Nurse already exists!");
      return;
    }
    
    // Create initial nurse user
    const nurseData = {
      userType: "nurse",
      nurseID: 3001,
      nurseName: "Sarah Johnson",
      email: "nurse@hospital.com",
      password: "nurse123", // You can change this password
      mobile: "8765432109",
      age: 32,
      gender: "Female",
      bloodGroup: "A+",
      DOB: "1991-08-22",
      address: "456 Nursing Home Ave, City",
      education: "BSc Nursing",
      image: "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
      details: "Registered nurse with 8+ years of experience in critical care"
    };
    
    const nurse = await NurseModel.create(nurseData);
    console.log("Initial nurse created successfully!");
    console.log("Email: nurse@hospital.com");
    console.log("Password: nurse123");
    console.log("Nurse ID: 3001");
    
  } catch (error) {
    console.error("Error creating nurse:", error);
  } finally {
    process.exit(0);
  }
};

createInitialNurse(); 