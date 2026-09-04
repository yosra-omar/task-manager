import { Router } from "express";
import *as TS from "./team.service.js";
import { authentication } from "../../common/middleware/authentication.js";
import { authorization } from "../../common/middleware/authorization.js";
import { validation } from "../../common/middleware/validation.js";
import * as TV  from "./team.validation.js";
const teamRouter = Router();


teamRouter.post("/create",validation(TV .createTeamSchema),authentication,TS.createTeam)
teamRouter.post("/members/:teamId",validation(TV.addMemberSchema),authentication,TS.addMemberOfteam)
teamRouter.delete("/:teamId/members/:userId",validation(TV.deleteMemberSchema),authentication,TS.deleteMember)
teamRouter.get("/:teamId",validation(TV.idSchema),authentication,TS.getTeam)


export default teamRouter;