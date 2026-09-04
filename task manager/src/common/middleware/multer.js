import multer from "multer"
import fs from "node:fs";

export const multerLocal = ({
    customType = [],
    customPath= "all"
}={})=>{

    
    const dirPath =`/upload/${customPath}`;
    if(!fs.existsSync(dirPath)){
       fs.mkdirSync(dirPath, { recursive : true})
    }
   const storage = multer.diskStorage({
 
     destination: function (req, file, cb) {
        cb(null, dirPath )
      },
     filename: function(req,file,cb){
          const pre = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,pre + "__" + file.originalname)
    }
   })

   const fileFilter = function fileFilter (req, file, cb) {
     if(!customType.includes(file.mimetype)){
       cb(new Error("this mimetype is not include"))
     }else{
        cb(null,true)
     }
   }

   const upload = multer({storage, fileFilter})
   return upload
}

