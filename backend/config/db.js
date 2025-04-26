import mongoose from "mongoose";

const connectDB = async () =>{
  try {
    mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.log(error)
    console.log("MongoDB connection failed")
  }
}
module.exports = connectDB;