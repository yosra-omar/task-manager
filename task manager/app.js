import express from "express";
import { checkconnectionDB } from "./src/db/connect.js";
import userRouter from "./src/modules/users/user.controller.js";
import teamRouter from "./src/modules/teams/team.controller.js";
import taskRouter from "./src/modules/tasks/task.controller.js";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/users",userRouter)
app.use("/teams",teamRouter)
app.use("/tasks",taskRouter)

checkconnectionDB();

app.get("/",(req,res)=>{
    res.status(200).json({message : "Hello in my app ...😀"})
})

app.use("{/demo}",(req,res)=>{
  throw new Error(`this URL ${req.originalUrl} and ${req.method} is not found`,{cause:404})
})

app.use((err,req,res,next)=>{
  const statusCode =err.statusCode || 500;
  
  res.status(statusCode).json({
    success:false,
    message:err.message,
    stack:err.stack
  })

})
app.listen(port,()=>{
    console.log(`server runing in port ${port}`);
    
})