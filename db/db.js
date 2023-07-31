const mongoose = require("mongoose");

const dbConnect = async (dbString) => {
  try {
    await mongoose.connect(dbString);
  } catch (error) {
    console.log("Couldn't connect to DB!", error);
  }
};

module.exports = dbConnect;
