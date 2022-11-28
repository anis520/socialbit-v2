import multer from'multer'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
 
//inti  config


 const storage = multer.diskStorage({

   destination:(req,file,cb)=>{

      cb(null,path.join(__dirname,'../public/img/allusers/'))
   },
   filename:(req,file,cb)=>{

    cb(null,file.originalname)



   }




}) 


export const userPhotoMulter=multer({


storage:storage




}).single('img');




 
export const userGallaryMulter=multer({


storage:storage




}).array('gallary');

 


 