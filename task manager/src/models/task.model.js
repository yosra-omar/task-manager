import mongoose from 'mongoose';
import { taskPriority, taskStatus } from '../enums/task.enum.js';


const taskSchema = new mongoose. Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
  maxLength: 50
  },
  description: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 500
  },
  status: {
    type: String,
    enum: [taskStatus.pending,taskStatus.in_progress,taskStatus.done],
    default: taskStatus.pending
  },
  priority:{
      type: String,
      enum: [taskPriority.high,taskPriority.low,taskPriority.medium],
      default: taskPriority.medium
  },
  dueDate: {
    type: Date
  },
  assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
    required: true
  },
  createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  team: {
      type: mongoose.Schema.Types.ObjectId,
     ref: 'Team',
     required: true
  },
  fileTask :{
      type: String,
   }  
}, { timestamps: true });

export const taskModel = mongoose.models.Task || mongoose.model("Task",taskSchema)