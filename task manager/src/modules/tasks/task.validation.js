import joi from "joi";
import { taskPriority, taskStatus } from "../../enums/task.enum.js";
import { generalRules } from "../../utils/generalRules.js";


export const createTaskSchema = {
    body:joi.object({
          title:joi.string().required(),
          description:joi.string().required(),
          status:joi.string().valid(taskStatus.done,taskStatus.in_progress,taskStatus.pending).required(),
          priority:joi.string().valid(taskPriority.high,taskPriority.low,taskPriority.medium).required(),
         dueDate:joi.date().greater("now").required(),
         assignedTo :generalRules.id.required(),
         team: generalRules.id.required(),
    }).required(),

    file:joi.object({
         fieldname: joi.string().required(),
          originalname: joi.string().required(),
          encoding: joi.string().required(),
          mimetype: joi.string().required(),
          destination: joi.string().required(),
          filename: joi.string().required(),
          path: joi.string().required(),
          size: joi.number().required()
    }).required()
}

export const  idSchema = {
    params :joi.object({
        taskId: generalRules.id.required()
    }).required()
}