
 
import UserSchema from "../models/userModel.js";
import { validation } from "../utility/valedator.js";
import bcrypt from 'bcrypt'
import { sendAEmail } from "../utility/sendmail.js";




// home controllder
export const homeController = (req, res) => {
    res.render("home");
    
};





// login controllder

export const loginController = (req, res) => {
    res.render("login");
   
};



// logout controllder

export const logoutController = (req, res) => {
    delete req.session.user
    validation('logout successfull',true,'/login',req,res)

   
};




// login post  controllder

export const loginpostController = async(req, res) => {
               
    const {email,password}=req.body

       if(!email || !password){

        validation('All fields are required',false,'/login',req,res)  
    
       
      
    }else{

       
        // find user are exiest
        const user = await UserSchema.findOne().where("email").equals(email);
      
          if(!user){
            
               
              validation('user not found',false,'/login',req,res)
              
        }else{

         //conpare berypt 
         const checkpass=bcrypt.compareSync(password,user.password)


            //check find user password
            if(checkpass){


                       if(!user.isverify){
                       req.session.verify = user._id
                        validation('please verify you account',false,'/login',req,res)

                       }else{
                           req.session.user =user
                  validation('User login successfull',true,'/',req,res)
                       }

               





            }else{
              
                validation('Password not match',false,'/login',req,res)

            }


          
        }
     
 


       }


   
};





// regestercontrollder

export const regesterController = (req, res) => {
    res.render("regester");
   
};

// regesterpostcontrollder

export const regesterpostController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            validation("All feild are required", false, "/regester", req, res);
        } else {
            const user = await UserSchema.findOne().where("email").equals(email);

            if (user) {
                validation("user already exedest", false, "/regester", req, res);
            } else {
 

            //make hash password 
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password,salt)   

                await UserSchema.create({ name, email, password :hash});
                validation("User create successfull", true, "/login", req, res);




            }
        }
    } catch (error) {
        validation(error.message, false, "/regester", req, res);
    }
};



// gallary controllder

export const gallaryController = (req, res) => {
    res.render("gallary");
  
};





// gallary post controllder

export const gallarypostController = async(req, res) => {
    
   




   if(req.files.length >0  ){

   

   if(req.files.length < 5){


    for(let i =0;i<req.files.length;i++){

           
        await UserSchema.findByIdAndUpdate(req.session.user._id,{
          

          $push :{
               gallary :req.files[i].filename

          }



        })


    }



 
   const livegallary = await UserSchema.findById(req.session.user._id)

   req.session.user.gallary = livegallary.gallary.reverse()
    
   validation('gallary done',true,'/gallary',req,res)


   }else{

    validation('please take only four',false,'/gallary',req,res)

   }





   }else{

     validation('please take a photo',false,'/gallary',req,res)
  

   }


};






// photo controllder

export const photoController = (req, res) => {
    res.render("changephoto");
   
};
// photo post controllder

export const photopostController = async(req, res) => {
    
 if(req.file){


const finduser =await UserSchema.findById(req.session.user._id)


   if( req.body.imgfor =='cover'){

       await UserSchema.findByIdAndUpdate(finduser._id,{cover:req.file.filename})
       req.session.user.cover =req.file.filename
       validation('cover photo updated',true,'/changephoto',req,res)
   }else{ 
    await UserSchema.findByIdAndUpdate(finduser._id,{img:req.file.filename})
    req.session.user.img =req.file.filename
    validation('profile photo updated',true,'/changephoto',req,res)
      
   }



 
 }else{

validation('Please take a img',false,'/changephoto',req,res)


 }




}

// info controllder

export const infoController = (req, res) => {
    res.render("info");
    
};

// edit controllder

export const editController = (req, res) => {
    res.render("edit");
 
};

// edit post controllder

export const editpostController = async(req, res) => {

const {username,location,number,gender}=req.body

  
   


 
   req.session.user.username =username
   req.session.user.location =location
   req.session.user.number =number
   req.session.user.gender =gender
   await UserSchema.findByIdAndUpdate(req.session.user._id,{username:username,location:location,number:number,gender:gender})
  
   validation('Info update done',true,'/edit',req,res)
 

 
};

// password controllder

export const changePasswordController = (req, res) => {
    res.render("changepassword");
     
};




// password  post controllder

export const changePasswordpostController = async(req, res) => {



   const {oldpassword,newpassword,newconpassword}=req.body
    
 
    if(!oldpassword || !newconpassword || !newconpassword){

      validation('All fields are requied',false,'/changepassword',req,res)

    }else{

        //    finduserpass
        const userpas= await UserSchema.findById(req.session.user._id)

            //check prevwis password
            const checkpassword =bcrypt.compareSync(oldpassword,userpas.password)

              if(!checkpassword){

                validation('Wroung passoword',false,'/changepassword',req,res)
            }else{
                
               
                if(newconpassword === newpassword){

               const salt = bcrypt.genSaltSync(10)
                  const hash = bcrypt.hashSync(newconpassword,salt)   

               await UserSchema.findByIdAndUpdate(userpas._id,{password:hash})

                validation('update done',true,'/changepassword',req,res)
                    



                }else{


                    validation('type error',false,'/changepassword',req,res)

                }
                


           



              }




    }

    




        
};





export const verifycontroller=async(req,res)=>{


        //  console.log(req.params);
         
        

    const user = await UserSchema.findById(req.params.id)
        

    sendAEmail(user.email,'verfylink',user._id,user.name)


    validation('verify link has send',true,'/login',req,res)
    





}


// verify now controller

export const verfynowcontroller=async(req,res)=>{


await UserSchema.findByIdAndUpdate(req.params.id,{isverify:true})
validation('you are now verifed',true,'/login',req,res)
  

}