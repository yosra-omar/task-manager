import { Router } from "express";
import *as US from "./user.service.js";
import { authentication } from "../../common/middleware/authentication.js";
import { validation } from "../../common/middleware/validation.js";
import { validationSchemaSignup } from "./user.validation.js";

const userRouter = Router();

userRouter.post("/signUp",validation(validationSchemaSignup),US.createUser)
userRouter.post("/signIn",US.signinUser)
userRouter.get("/profile",authentication,US.getProfile)
userRouter.patch("/logout",authentication,US.getProfile)

export default userRouter;