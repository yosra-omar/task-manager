import jwt from "jsonwebtoken";

export const generateToken = ({payload, secretKey, options = {}}={})=>{
   return jwt.sign(payload, secretKey, options)

}

export const isTokenValid = ({token , secretKey}={})=>{
    return jwt.verify(token , secretKey)
}