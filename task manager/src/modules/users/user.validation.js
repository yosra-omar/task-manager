import joi from "joi";
import { userGender } from "../../enums/user.enum.js";
import { generalRules } from "../../utils/generalRules.js";

export const validationSchemaSignup= {
 body :joi.object({
    fName:joi.string().required(),
    lName:joi.string().required(),
    email: generalRules.email.required(),
    password:generalRules.password.required(),
    cPassword : joi.string().valid(joi.ref("password")).required(),
    age:joi.number().integer().positive().required(),
    gender:joi.string().valid(userGender.female,userGender.male).required()
    .messages({  "any.only": "Confirm password must match password"})
}).required(),
  Query:joi.object({
    flag:joi.boolean().required()
  })
}

export const signInSchema ={
    body:joi.object({
    email:generalRules.email.required(),
    password:generalRules.password.required(),

}).required()
}