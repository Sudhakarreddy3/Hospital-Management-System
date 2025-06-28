const { Sequelize } = require('sequelize');
const path = require('path');

// Create SQLite database file in the project root
const dbPath = path.join(__dirname, '..', 'hospital.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false, // Set to console.log to see SQL queries
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite database connected successfully.');
    
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized.');
    
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

module.exports = { connection, sequelize };
