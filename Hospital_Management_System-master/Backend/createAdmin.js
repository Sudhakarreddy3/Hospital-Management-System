const { connection } = require("./configs/db");
const { AdminModel } = require("./models/Admin.model");
const bcrypt = require("bcrypt");

const createInitialAdmin = async () => {
  try {
    await connection();
    
    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({
      where: { email: "admin@hospital.com" }
    });
    
    if (existingAdmin) {
      console.log("Admin already exists!");
      return;
    }
    
    // Create initial admin user
    const adminData = {
      userType: "admin",
      adminID: 1001,
      adminName: "Hospital Admin",
      email: "admin@hospital.com",
      password: "admin123", // You can change this password
      gender: "Male",
      age: 35,
      mobile: "1234567890",
      DOB: "1988-01-01",
      address: "Hospital Address",
      education: "MBA Healthcare Management",
      image: "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg"
    };
    
    const admin = await AdminModel.create(adminData);
    console.log("Initial admin created successfully!");
    console.log("Email: admin@hospital.com");
    console.log("Password: admin123");
    console.log("Admin ID: 1001");
    
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    process.exit(0);
  }
};

createInitialAdmin(); 