import * as dbService from "../../db/db.service.js";
import { taskPriority, taskStatus } from "../../enums/task.enum.js";
import { taskModel } from "../../models/task.model.js";


export const createTask = async(req,res)=>{
  
   const {
    title,
    description,
    status,
    priority,
    dueDate,
    assignedTo,
    team,
} = req.body;

const task = await dbService.create({
    model: taskModel,
    data : {  
        title,
        description,
        status,
        priority,
        dueDate,
        assignedTo,
        createdBy:req.user._id,
        fileTask: req.file.path,
        team 
     }
})

   res.status(201).json({message:"task is created successfully", task})

//   const myTeam = await teamModel.findById(teamId)
//   if(!myTeam){
//   }
}

export const getAllTasks = async(req,res)=>{

   const tasks = await taskModel.aggregate([
       {
        $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            pipeline:[
                {
                    $project:{
                         _id: 0,
                        fName: 1,
                        lName: 1,
                        email: 1,
                        role:1
                    }
                }
            ],
            as: "creator"
        }
    },{
      $project: {
        _id: 0,
        name: 1,
        description:1,
        dueDate: 1,
        assignedTo: 1,
        title: 1,
        status: 1,
        priority: 1,
        creator:1,
        createdBy: 1,

}}
    ,{
        $sort:{
            createdAt:  1
        }
    }
   ])

     res.status(200).json({message:"done", tasks})

}

export const getSingleTask = async(req,res)=>{
    const {taskId} = req.params;

   const task = await dbService.findById({
    model : taskModel,
    id :taskId
   })

   if(!task){
     throw new Error("task is not found" , {cause: 404})
   }

   res.status(200).json({message:"done", task})
}

export const updateTask = async(req,res)=>{
    const {taskId} = req.params;
  const {
    status,
    priority,
    dueDate,
    assignedTo,
} = req.body;

 const task =await  dbService.findByIdAndUpdate({
    model:taskModel,
    id : taskId,
    update: {
       status,
       priority,
        dueDate ,
    assignedTo ,
  },
 options:{
    new : true,
    runValidators: true
}})

    if(!task){
     throw new Error("task you want update is not found" , {cause: 404})
   }

      res.status(201).json({message:"task is update successfully", task})
}    

export const deleteTask = async(req,res)=>{
     const {taskId} = req.params;
    
    const task = await dbService.findByIdAndDelete({
        model : taskModel,
        id: taskId
    })
     if (!task) {
        throw new Error("Task not found", { cause: 404 });
    }

    res.status(200).json({message: "Task delete successfully",  task  });
}
