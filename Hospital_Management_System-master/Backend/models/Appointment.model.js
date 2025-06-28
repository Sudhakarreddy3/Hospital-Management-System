const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const AppointmentModel = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userType: {
    type: DataTypes.STRING,
    defaultValue: "patient",
  },
  patientID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  patientName: {
    type: DataTypes.STRING,
  },
  mobile: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: DataTypes.TEXT,
  },
  disease: {
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.STRING,
  },
  time: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'appointments',
  timestamps: true
});

module.exports = { AppointmentModel };
