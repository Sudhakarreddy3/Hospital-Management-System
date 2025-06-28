const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const PrescriptionModel = sequelize.define('Prescription', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patientID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  doctorID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  doctorName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  medications: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dosage: {
    type: DataTypes.TEXT
  },
  instructions: {
    type: DataTypes.TEXT
  },
  prescriptionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  nextVisit: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'prescriptions',
  timestamps: true
});

module.exports = { PrescriptionModel };
