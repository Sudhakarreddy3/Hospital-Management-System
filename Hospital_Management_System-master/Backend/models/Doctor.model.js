const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const DoctorModel = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userType: {
    type: DataTypes.STRING,
    defaultValue: "doctor",
  },
  docID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  docName: {
    type: DataTypes.STRING,
  },
  mobile: {
    type: DataTypes.STRING,
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
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  gender: {
    type: DataTypes.STRING,
  },
  bloodGroup: {
    type: DataTypes.STRING,
  },
  DOB: {
    type: DataTypes.DATE,
  },
  address: {
    type: DataTypes.TEXT,
  },
  education: {
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },
  details: {
    type: DataTypes.TEXT,
  }
}, {
  tableName: 'doctors',
  timestamps: true,
  hooks: {
    beforeCreate: (doctor) => {
      // Convert mobile to string if it's a number
      if (doctor.mobile && typeof doctor.mobile === 'number') {
        doctor.mobile = doctor.mobile.toString();
      }
    },
    beforeUpdate: (doctor) => {
      // Convert mobile to string if it's a number
      if (doctor.mobile && typeof doctor.mobile === 'number') {
        doctor.mobile = doctor.mobile.toString();
      }
    }
  }
});

module.exports = { DoctorModel };
