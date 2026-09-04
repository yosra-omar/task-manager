import { Compare, Hash } from "../../common/security/hash.js";
import { create, findOne } from "../../db/db.service.js";
import { userModel } from "../../models/user.model.js";
import { generateToken } from "../../utils/jwt.js";


// ================ signUp user =======================
export const createUser = async(req,res)=>{
    const {
  fName,
    lName,
    email,
    password,
    cPassword,
    age,
    gender} = req.body;

    const emailExists = await findOne({
        model : userModel,
        filter:{email}
    })

    if(emailExists){
        throw new Error("Email already exists", { cause: 409 });
    }

    const user = await create({
        model : userModel,
        data :{ 
    fName,
    lName,
    email,
    age,
    gender,
    password: Hash(password),
    cPassword
}})
       res.status(201).json({message: "done",user})


}

// ============= sign in user =================
export const signinUser = async(req,res)=>{

    const { email , password } = req.body;
   
    const user= await userModel.findOne({email })

    if(!user){
        throw new Error("user not exist",{cause:409})
    }


    if(!Compare(password, user.password)){
        throw new Error("password not match ",{cause:401})
    }
    const access_token = generateToken({
        payload:{
            userId: user._id,
            name: user.name,
            role : user.role
        },
        secretKey:"yosra123",
        options:{expiresIn: "1h"}
    })
     const refresh_token = generateToken({
        payload:{
            userId: user._id,
            name: user.name,
            role : user.role
        },
        secretKey:"yosra@123",
        options:{expiresIn: "1y"}
    })
    res.status(200).json({message: "done",access_token, refresh_token})
}

// ===================== get profile =======================
export const getProfile = async(req,res)=>{
   const user = req.user
    res.status(200).json({message:"done", user })
}
// ======================= logout ============
export const logout = async(req,res)=>{
  
      req.user.changeCredential = new Date()
     await req.user.save()
  
         accessRespose({res, message: "you are logout successfully " })

}