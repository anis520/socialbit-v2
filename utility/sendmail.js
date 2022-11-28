import nodemailer from "nodemailer"




 
export const sendAEmail =(to,sub,id,name)=>{


 
        const transport=nodemailer.createTransport({
    
           host:'smtp.gmail.com',
           port:587,
           auth :{

                    user:'ahisahad520@gmail.com',
                    pass:process.env.EMAIL_PASS

           }

})
transport.sendMail({


   from:'ahisahad520@gmail.com',
   to:to,
   subject:sub,
   html:`
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .plan{
                width: 60vh;
                height: auto;
                border: 1px solid gray;
                border-radius: 10px;
                padding:20px;
                 margin: 100px auto 0px;
                

        }
         .plan .logo{
               width: 100px;
               height: auto;
               /* margin-left:0px; */
              display: block;
              margin: 0px auto;
              text:bolder;
              
        

         }
      .planimg{
            width: 100%;
            height: 250px;
            object-fit: cover;
            margin-top: 30px;

      }


    </style>
</head>
<body >
    


                <div class="plan" >
                       
                    <div style="color:blue;font-weight:bolder;" class="logo "> Social bit</div>
                     <hr>
                      <img class="planimg" src="https://wbweb.com.br/images/blog/o-que-um-social-media-faz.png" alt="">
                      
                       <p style="margin:20px 0;color:blue;">hello Dear  ${name}. you are successfully regester in social bit website .Please verify your accout for login</p>
                   
                        <a href="http://localhost:5050/verifyme/${id}"><button style="padding:7px 30px;background-color: blue; color:white; border: none;border-radius: 5px;margin-left:180px; margin-top: 20px;">Verify now</button>   </a>



                </div>
 




</body>
</html>
   `

})



 
} 








 