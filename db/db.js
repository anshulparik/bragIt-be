const mongoose = require("mongoose");

const dbConnect = async (dbString) => {
  try {
    await mongoose.connect(dbString);
  } catch (error) {
    console.log("Error while connecting to the DB!", error);
  }
};

module.exports = dbConnect;
