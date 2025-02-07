const db = require("../models");

const resetDB = async (erase = false) => {
  try {
    console.log("Database storage path:", db.sequelize.options.storage);
    if (erase) {
      console.log("Dropping and recreating the database...");
      await db.sequelize.sync({ force: true });
    } else {
      console.log("Synchronizing the database...");
      await db.sequelize.sync();
    }
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    process.exit();
  }
};

const erase = process.argv.includes("--erase");
resetDB(erase);
