const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const AmbulanceModel = sequelize.define('Ambulance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  charges: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ambulanceID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ambulanceDriver: {
    type: DataTypes.STRING,
    allowNull: false
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'ambulances',
  timestamps: true
});

module.exports = { AmbulanceModel };
