// import all modules

import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import expressEjsLayouts from 'express-ejs-layouts'
import { router } from './router/router.js'
import { mongoDBConnection } from './config/db.js'
 import { localsMiddlewares } from './middlewares/localsMiddlewares.js'
import session from 'express-session'
 



//dotenv config
dotenv.config()



// config port
const port = process.env.PORT || 4000




const app = express()

// express middelwares

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


//setup session 

app.use(session({


    secret :"I love mern",
    saveUninitialized:true,
    resave:false
    
    
    
    }))
app.use(localsMiddlewares)


// stactic public folder 
app.use(express.static('public'))


//   ejs init 

app.set("view engine","ejs")
app.use(expressEjsLayouts)
app.set('layout','layouts/app')





 
app.use(router)
 




//server port set up

app.listen(port,()=>{

 mongoDBConnection()
 console.log( `Server was running localhost : ${port}`.bgGreen.white);

 
}) 