import joi from "joi";
import { Types } from "mongoose";

export const generalRules = {
    email:joi.string().email({tlds:{allow:true},maxDomainSegments:3}),
    password:joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),

    id: joi.string().custom((value,helper)=>{
        const isValid = Types.ObjectId.isValid(value)
       return  isValid ? value : helper.message("InValid id ")
    })
}