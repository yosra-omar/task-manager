import mongoose from "mongoose";
const URL= "mongodb://localhost:27017/taskManager";

export const checkconnectionDB = ()=>{
  try {
    mongoose.connect(URL);
  console.log(`connect successfully of DB URL ${URL}`);
  
  } catch (error) {
    console.log("fail to connect",error);
  }
}

