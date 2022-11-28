import session from "express-session"
 


export const  validation =(message,status,redirect ,req,res)=>{

    req.session.message = message
    req.session.status = status
 
 
 
 
     res.redirect(redirect)
 


}    