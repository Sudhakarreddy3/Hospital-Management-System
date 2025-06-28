const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const PatientModel = sequelize.define('Patient', {
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
    unique: true
  },
  patientName: {
    type: DataTypes.STRING,
  },
  mobile: {
    type: DataTypes.STRING,
    validate: {
      len: [10, 15]
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    defaultValue: "password",
  },
  age: {
    type: DataTypes.INTEGER,
  },
  department: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  bloodGroup: {
    type: DataTypes.STRING,
  },
  DOB: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING,
  },
  disease: {
    type: DataTypes.STRING,
  },
  details: {
    type: DataTypes.TEXT,
  },
  admitted: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  date: {
    type: DataTypes.DATE,
  },
  docID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'doctors',
      key: 'id'
    }
  },
  nurseID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'nurses',
      key: 'id'
    }
  }
}, {
  tableName: 'patients',
  timestamps: true,
  hooks: {
    beforeCreate: (patient) => {
      // Convert mobile to string if it's a number
      if (patient.mobile && typeof patient.mobile === 'number') {
        patient.mobile = patient.mobile.toString();
      }
    },
    beforeUpdate: (patient) => {
      // Convert mobile to string if it's a number
      if (patient.mobile && typeof patient.mobile === 'number') {
        patient.mobile = patient.mobile.toString();
      }
    }
  }
});

module.exports = { PatientModel };
