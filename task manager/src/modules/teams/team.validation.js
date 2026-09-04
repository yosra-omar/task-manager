import joi from "joi"
import { generalRules } from "../../utils/generalRules.js"


export const createTeamSchema = {
    body:joi.object({
          name:joi.string().min(3).max(50).required(),
          description:joi.string().min(10).max(500),
    }).required(),

}

export const  deleteMemberSchema = {
    params :joi.object({
        teamId: generalRules.id.required(),
        userId:generalRules.id.required()
    }).required()
}

export const  addMemberSchema = {
    body :joi.object({
         email: generalRules.email.required()
    }).required(),
    params :joi.object({
        teamId: generalRules.id.required()
    }).required()
}

export const  idSchema = {
    params :joi.object({
        teamId: generalRules.id.required()
    }).required()
}