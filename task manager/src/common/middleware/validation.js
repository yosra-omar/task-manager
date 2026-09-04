

export const validation = (schema)=>{
   return  async(req ,res,next)=>{
     
    const errorDetails = [ ];
    for(const key of Object.keys(schema)){
       const {error } = schema[key].validate(req[key],{abortEarly : false})

       if(error){
         error.details.forEach(ele=> {
      errorDetails.push({
        key,
         path: ele.path[0],
         message : ele.message
     })    
        });
       }
     }
     if(errorDetails?.length){
      return  res.status(400).json({message : "validation error ",error : errorDetails})
    }
        next();
   }

}