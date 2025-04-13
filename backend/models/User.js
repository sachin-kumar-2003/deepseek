import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
    image:{
      type:String,
      required:false,
    },
  },{timstamps:true});

const User = mongoose.model("User",UserSchema);
export default User;