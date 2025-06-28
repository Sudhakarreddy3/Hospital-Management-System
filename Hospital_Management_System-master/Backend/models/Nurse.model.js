const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const NurseModel = sequelize.define('Nurse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userType: {
    type: DataTypes.STRING,
    defaultValue: "nurse",
  },
  nurseID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  nurseName: {
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
    type: DataTypes.STRING,
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
  tableName: 'nurses',
  timestamps: true,
  hooks: {
    beforeCreate: (nurse) => {
      // Convert mobile to string if it's a number
      if (nurse.mobile && typeof nurse.mobile === 'number') {
        nurse.mobile = nurse.mobile.toString();
      }
    },
    beforeUpdate: (nurse) => {
      // Convert mobile to string if it's a number
      if (nurse.mobile && typeof nurse.mobile === 'number') {
        nurse.mobile = nurse.mobile.toString();
      }
    }
  }
});

module.exports = { NurseModel };
