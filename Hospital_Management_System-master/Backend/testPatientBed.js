const { connection } = require("./configs/db");
const { PatientModel } = require("./models/Patient.model");
const { BedModel } = require("./models/Bed.model");

const testPatientBedAssignment = async () => {
  try {
    await connection();
    
    console.log("Testing patient-bed assignment...");
    
    // Create a test patient
    const patientData = {
      userType: "patient",
      patientID: 5001,
      patientName: "Test Patient",
      mobile: "1234567890",
      email: "testpatient@example.com",
      password: "patient123",
      age: 30,
      department: "Cardiology",
      gender: "Male",
      bloodGroup: "A+",
      DOB: "1993-01-01",
      address: "123 Test St, City",
      disease: "Hypertension",
      details: "Test patient for bed assignment",
      admitted: true,
      date: new Date()
    };
    
    // Create the patient
    const patient = await PatientModel.create(patientData);
    console.log(`✅ Created patient: ${patient.patientName} (ID: ${patient.id})`);
    
    // Find an available bed
    const availableBed = await BedModel.findOne({
      where: { occupied: 'available' }
    });
    
    if (!availableBed) {
      console.log("❌ No available beds found");
      return;
    }
    
    console.log(`✅ Found available bed: ${availableBed.bedNumber} in room ${availableBed.roomNumber}`);
    
    // Assign patient to bed
    await availableBed.update({
      patientID: patient.id,
      occupied: 'occupied'
    });
    
    console.log(`✅ Assigned patient ${patient.patientName} to bed ${availableBed.bedNumber}`);
    
    // Verify the assignment by fetching bed with patient info
    const updatedBed = await BedModel.findByPk(availableBed.id, {
      include: [
        {
          model: PatientModel,
          as: 'patient',
          attributes: ['id', 'patientID', 'patientName', 'disease', 'age', 'gender']
        }
      ]
    });
    
    console.log("\n📋 Bed Assignment Verification:");
    console.log(`Bed: ${updatedBed.bedNumber} | Room: ${updatedBed.roomNumber} | Status: ${updatedBed.occupied}`);
    console.log(`Patient: ${updatedBed.patient ? updatedBed.patient.patientName : 'No Patient'}`);
    console.log(`Patient ID: ${updatedBed.patient ? updatedBed.patient.patientID : 'N/A'}`);
    console.log(`Disease: ${updatedBed.patient ? updatedBed.patient.disease : 'N/A'}`);
    
    console.log("\n✅ Patient-bed assignment test completed successfully!");
    
  } catch (error) {
    console.error("❌ Error during test:", error);
  } finally {
    process.exit(0);
  }
};

testPatientBedAssignment(); 