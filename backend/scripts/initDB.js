const db = require("../models");

const resetDB = async (erase = false) => {
  try {
    if (erase) {
      console.log("Dropping and recreating the database...");
      await db.sequelize.sync({ force: true }); // Erases all data
    } else {
      console.log("Synchronizing the database (keeping data)...");
      await db.sequelize.sync(); // Keeps existing data
    }
    console.log("Database initialized.");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    process.exit();
  }
};

const erase = process.argv.includes("--erase"); // Run with "--erase" to clear data
resetDB(erase);
