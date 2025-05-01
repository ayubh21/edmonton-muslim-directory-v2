import mongoose from "mongoose";

const mongoConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
  }
};

export default mongoConnection;
// MongoDB Connection
