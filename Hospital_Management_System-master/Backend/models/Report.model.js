const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const ReportModel = sequelize.define('Report', {
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
  testType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  testResults: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  testDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  reportDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  notes: {
    type: DataTypes.TEXT
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2)
  }
}, {
  tableName: 'reports',
  timestamps: true
});

module.exports = { ReportModel };
