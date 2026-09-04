


export const create =async ({model , data}={})=>{
   return await model.create([data])
}

export const findOne =async ({model , filter,options = {}})=>{
   return await model.findOne( filter , options)
}


export const findById = async({model , id , options = {}} ={})=>{
   return await model.findById(id).select(options.select || " ")
}

export const findByIdAndUpdate = async({model , id , update,options = {new : true }}= {})=>{
   return await model.findByIdAndUpdate(id,update, options)
}

export const findByIdAndDelete = async({model , id }= {})=>{
   return await model.findByIdAndDelete(id)
}
