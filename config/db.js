 
import mongoose from "mongoose";
import colors from "colors"






// mongodb  connction


export   const mongoDBConnection=async()=>{


    try{ 
          
        const connect = await mongoose.connect(process.env.MONGO_URI)
         console.log('monogDB connected success full '.bgYellow);
    }catch(error){
 
       console.log(`${error.message}`.bgRed.white);
 
    } 


  

}



 