import mongoose from "mongoose";

let isConnected = false; // Track the connection

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "deepseek", // change this to your DB name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Optional: crash the server if DB fails
  }
};
connectDB();