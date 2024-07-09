const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`
    );
    if (!connectionInstance) {
      console.log("MongoDB connection failed.");
    }
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(
      "MongoDB connection is Failed due to some erros...........",
      error
    );
  }
};

module.exports = connectDB;
