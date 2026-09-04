import { Router } from "express";
import *as TS from "./task.service.js";
import { authentication } from "../../common/middleware/authentication.js";
import * as VT from "./task.validation.js";
import { validation } from "../../common/middleware/validation.js";
import { multerLocal } from "../../common/middleware/multer.js";
const taskRouter = Router();


taskRouter.post("/create",
    multerLocal({customPath : "tasks",
     customType : ["application/pdf","application/json", "image/jpeg" ]})
    .single("attachment"),
    validation(VT.createTaskSchema),
    authentication,
    TS.createTask)


taskRouter.get("/tasks",authentication,TS.getAllTasks)
taskRouter.get("/:taskId",validation(VT.idSchema),authentication,TS.getSingleTask)
taskRouter.patch("/:taskId",validation(VT.idSchema),authentication,TS.updateTask)
taskRouter.delete("/:taskId",validation(VT.idSchema),authentication,TS.deleteTask)

export default taskRouter;