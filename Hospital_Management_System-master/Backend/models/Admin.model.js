const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const AdminModel = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userType: {
    type: DataTypes.STRING,
    defaultValue: "admin",
  },
  adminID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  adminName: {
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
  gender: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  mobile: {
    type: DataTypes.STRING,
    validate: {
      len: [10, 15]
    }
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
  image: {
    type: DataTypes.STRING,
    defaultValue: "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  }
}, {
  tableName: 'admins',
  timestamps: true,
  hooks: {
    beforeCreate: (admin) => {
      // Convert mobile to string if it's a number
      if (admin.mobile && typeof admin.mobile === 'number') {
        admin.mobile = admin.mobile.toString();
      }
    },
    beforeUpdate: (admin) => {
      // Convert mobile to string if it's a number
      if (admin.mobile && typeof admin.mobile === 'number') {
        admin.mobile = admin.mobile.toString();
      }
    }
  }
});

module.exports = { AdminModel };
