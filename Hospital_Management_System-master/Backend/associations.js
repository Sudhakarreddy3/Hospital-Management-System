const { BedModel } = require("./models/Bed.model");
const { PatientModel } = require("./models/Patient.model");
const { DoctorModel } = require("./models/Doctor.model");
const { NurseModel } = require("./models/Nurse.model");

// Set up associations
const setupAssociations = () => {
  // Bed belongs to Patient
  BedModel.belongsTo(PatientModel, {
    foreignKey: 'patientID',
    as: 'patient'
  });

  // Patient has many Beds
  PatientModel.hasMany(BedModel, {
    foreignKey: 'patientID',
    as: 'beds'
  });

  // Patient belongs to Doctor
  PatientModel.belongsTo(DoctorModel, {
    foreignKey: 'docID',
    as: 'doctor'
  });

  // Doctor has many Patients
  DoctorModel.hasMany(PatientModel, {
    foreignKey: 'docID',
    as: 'patients'
  });

  // Patient belongs to Nurse
  PatientModel.belongsTo(NurseModel, {
    foreignKey: 'nurseID',
    as: 'nurse'
  });

  // Nurse has many Patients
  NurseModel.hasMany(PatientModel, {
    foreignKey: 'nurseID',
    as: 'patients'
  });
};

module.exports = { setupAssociations }; 