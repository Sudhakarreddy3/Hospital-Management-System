const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const BedModel = sequelize.define('Bed', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bedNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  roomNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  occupied: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available'
  },
  patientID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'patients',
      key: 'id'
    }
  }
}, {
  tableName: 'beds',
  timestamps: true
});

module.exports = { BedModel };
