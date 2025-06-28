const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const PaymentModel = sequelize.define('Payment', {
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
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paymentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'payments',
  timestamps: true
});

module.exports = { PaymentModel };
