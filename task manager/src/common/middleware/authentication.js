import { userModel } from "../../models/user.model.js";
import { isTokenValid } from "../../utils/jwt.js";


export const authentication =async (req,res,next)=>{
    
    const authorization  = req .headers.authorization;
 
    const [,token] = authorization.split(" ")

    if(!authorization){
        throw new Error("token is required")
    }

   const decoded= isTokenValid ({
    token,
    secretKey: "yosra123"
})
     const user = await userModel.findOne({_id: decoded.userId})
  if(!user){
        throw new Error(`no user with id ${decoded.userId}`)
    }

    if(user?.changeCredential?.getTime() > decode.iat *1000){
      throw new Error("you are logged out please login again")
    }
 req.user =user;

 next()

}