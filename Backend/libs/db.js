
import mongoose from "mongoose";

const DBCon = async () => {
  const mongoURI =
    process.env.MONGODB_URI || process.env.MONGDB_ULR;

  if (!mongoURI) {
    console.error("MongoDB error: MONGODB_URI environment variable is missing");
    return;
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default DBCon;
