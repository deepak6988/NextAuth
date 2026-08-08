import mongoose from "mongoose";

const dbConfig = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    conn.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default dbConfig;