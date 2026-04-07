const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(
      `${process.env.MONGODB_URI}/url-shortner`,
    );
  } catch (error) {
    throw new Error("Db error", error);
  }
};

module.exports = connectDB;
