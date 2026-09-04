import { decode } from "jsonwebtoken";
import *as  dbService from "../../db/db.service.js";
import { teamModel } from "../../models/team.model.js"
import { userModel } from "../../models/user.model.js";


export const createTeam = async(req,res)=>{
   const {name , description} =req.body;

   const team = await  dbService.create({
      model : teamModel,
      data:{
         name,
         description,
         owner:req.user._id,
         member:[{
            user:req.user._id,
            role:"admin"
      }
         ]
      }
   })
   res.status(201).json({message : "team is created successfully", team })
}

export const addMemberOfteam = async(req,res)=>{
  const {teamId} = req.params;
  const { email } = req.body

       const team = await dbService.findById({
         model:teamModel,
         id:teamId
       });

  if(!team){
    throw new Error("team is not found",{cause :404})
  }

  if(req.user._id.toString() !== team.owner.toString()){
        throw new Error("only team admin can add member", { cause: 403 });
  }

  const user = await dbService.findOne({
    model : userModel,
    filter: {email }
  })

     if (!user) {
        throw new Error("user not exist", { cause: 403 });
    }

  const isMember = team.members.find(
        (item) => item.user.toString() === user._id.toString()
    );

    if (isMember) {
        throw new Error("user is already a member", { cause: 409 });
    }
    
    team.members.push({user: user._id, role: "member"})
   await team.save()

       res.status(201).json({message : "member add successfully"})
 }

 export const deleteMember = async(req,res)=>{
    const  { teamId,  userId} = req.params;
    //const {userId} = req.body;
         const team = await dbService.findById({
            model:teamModel,
            id: teamId
         });

        if(!team){
            throw new Error("team is not found",{cause :404})
       }
       if(req.user._id.toString() !== team.owner.toString()){
               throw new Error("only team admin can remove member", { cause: 403 });
         }
               
         const user = await dbService.findById({
            model: userModel,
            id: userId
         });

     if (!user) {
         throw new Error("user not exist", { cause: 403 });
             }

     const isMember = team.members.find(
        (item) => item.user.toString() === user._id.toString()
    );

    if (isMember) {
      team.members = team.members.filter(
         (item) => item.user.toString() !== userId.toString()
      );
    }
     
      await team.save();

       res.status(201).json({message : "member remove successfully",team})

}

export const getTeam = async(req,res)=>{
   const {teamId} = req.params;

   const team = await  dbService.findById({
            model:teamModel,
            id: teamId
         });

   if(!team){
          throw new Error("team is not found",{cause :404})
   }
      const isMember = team.members.find(
         (item) => item.user.toString() === req.user._id.toString()
      );

    if(!isMember){
       throw new Error("you are not member of this team",{cause: 409})
    }
       res.status(200).json({message:"done" ,  team})
}