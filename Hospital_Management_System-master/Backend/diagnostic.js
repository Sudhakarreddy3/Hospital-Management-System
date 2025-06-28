const { connection } = require("./configs/db");
const { AdminModel } = require("./models/Admin.model");
const { DoctorModel } = require("./models/Doctor.model");
const { NurseModel } = require("./models/Nurse.model");
const { PatientModel } = require("./models/Patient.model");
const { BedModel } = require("./models/Bed.model");
const { AmbulanceModel } = require("./models/Ambulance.model");
const { AppointmentModel } = require("./models/Appointment.model");
const { ReportModel } = require("./models/Report.model");

const runDiagnostic = async () => {
  try {
    console.log("🔍 HOSPITAL MANAGEMENT SYSTEM DIAGNOSTIC");
    console.log("==========================================");
    
    // Connect to database
    await connection();
    console.log("✅ Database connection: SUCCESS");
    
    // Check all models
    console.log("\n📋 MODEL STATUS:");
    console.log("-----------------");
    
    const adminCount = await AdminModel.count();
    const doctorCount = await DoctorModel.count();
    const nurseCount = await NurseModel.count();
    const patientCount = await PatientModel.count();
    const bedCount = await BedModel.count();
    const ambulanceCount = await AmbulanceModel.count();
    const appointmentCount = await AppointmentModel.count();
    const reportCount = await ReportModel.count();
    
    console.log(`✅ Admins: ${adminCount}`);
    console.log(`✅ Doctors: ${doctorCount}`);
    console.log(`✅ Nurses: ${nurseCount}`);
    console.log(`✅ Patients: ${patientCount}`);
    console.log(`✅ Beds: ${bedCount}`);
    console.log(`✅ Ambulances: ${ambulanceCount}`);
    console.log(`✅ Appointments: ${appointmentCount}`);
    console.log(`✅ Reports: ${reportCount}`);
    
    // Check associations
    console.log("\n🔗 ASSOCIATION TEST:");
    console.log("-------------------");
    
    try {
      const bedsWithPatients = await BedModel.findAll({
        include: [
          {
            model: PatientModel,
            as: 'patient',
            attributes: ['id', 'patientID', 'patientName', 'disease']
          }
        ]
      });
      console.log(`✅ Bed-Patient associations: WORKING (${bedsWithPatients.length} beds found)`);
    } catch (error) {
      console.log(`❌ Bed-Patient associations: FAILED - ${error.message}`);
    }
    
    // Check sample data
    console.log("\n📊 SAMPLE DATA CHECK:");
    console.log("---------------------");
    
    if (adminCount === 0) {
      console.log("⚠️  No admin users found - need to create admin");
    } else {
      const admin = await AdminModel.findOne();
      console.log(`✅ Admin exists: ${admin.adminName} (${admin.email})`);
    }
    
    if (doctorCount === 0) {
      console.log("⚠️  No doctors found - need to create doctor");
    } else {
      const doctor = await DoctorModel.findOne();
      console.log(`✅ Doctor exists: ${doctor.doctorName} (${doctor.email})`);
    }
    
    if (nurseCount === 0) {
      console.log("⚠️  No nurses found - need to create nurse");
    } else {
      const nurse = await NurseModel.findOne();
      console.log(`✅ Nurse exists: ${nurse.nurseName} (${nurse.email})`);
    }
    
    // Check bed status
    if (bedCount > 0) {
      const availableBeds = await BedModel.count({ where: { occupied: 'available' } });
      const occupiedBeds = await BedModel.count({ where: { occupied: 'occupied' } });
      console.log(`✅ Beds: ${availableBeds} available, ${occupiedBeds} occupied`);
    }
    
    // Check ambulance status
    if (ambulanceCount > 0) {
      const availableAmbulances = await AmbulanceModel.count({ where: { isAvailable: true } });
      console.log(`✅ Ambulances: ${availableAmbulances} available`);
    }
    
    console.log("\n🎯 RECOMMENDATIONS:");
    console.log("-------------------");
    
    if (adminCount === 0) {
      console.log("1. Run: node createAdmin.js");
    }
    if (doctorCount === 0) {
      console.log("2. Run: node createDoctor.js");
    }
    if (nurseCount === 0) {
      console.log("3. Run: node createNurse.js");
    }
    if (bedCount === 0) {
      console.log("4. Add some beds through the admin interface");
    }
    if (ambulanceCount === 0) {
      console.log("5. Add some ambulances through the admin interface");
    }
    
    console.log("\n✅ DIAGNOSTIC COMPLETE");
    console.log("======================");
    
  } catch (error) {
    console.error("❌ DIAGNOSTIC FAILED:", error.message);
  } finally {
    process.exit(0);
  }
};

runDiagnostic(); 