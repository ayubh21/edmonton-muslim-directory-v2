import mongoose from "mongoose";
export async function mongoConnection() {
  const conn = await mongoose.connect("mongodb://localhost:27017");
  if (!conn) {
    throw "failed to connecto mongo instance";
  } else {
    console.log("Database Connection Successful");
  }
  return conn;
}
