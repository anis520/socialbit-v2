export const localsMiddlewares =(req,res,next)=>{




   res.locals.message =req.session.message
   res.locals.status =req.session.status
   res.locals.user =req.session.user
   res.locals.verify =req.session.verify
 

   delete req.session.message
   delete req.session.status
   delete req.session.verify
 

  next()



}