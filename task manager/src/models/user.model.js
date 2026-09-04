
import mongoose from "mongoose";
import { userGender } from "../enums/user.enum.js";

 const userSchema = new mongoose.Schema({
    fName:{
      type:String,
      required:true,
      trim : true
    },
    lName:{
      type:String,
      required:true,
      trim : true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true ,"please provide password"],
        minLength:5
    },
  age:{
    type:Number,
    required: true
  },
   gender:{
    type:String,
    enum:[userGender.male,userGender.female]
   },
   changeCredential: Date ,
    role:{
        type:String,
        enum: ["user", "admin"],
        default: "user"  
      }
},{
    timeStamps:true
})

export const userModel = mongoose.models.User || mongoose.model("User",userSchema)