import { validation } from "../utility/valedator.js"



export const checkLogin =(req,res,next)=>{


      
if(req.session.user){

    
    next()
}else{

validation('login frist ',false ,'/login',req,res)


}





}