import express from 'express'
import { changePasswordController, changePasswordpostController, editController, editpostController, gallaryController, gallarypostController, homeController, infoController, loginController, loginpostController, logoutController, photoController, photopostController, regesterController, regesterpostController, verfynowcontroller, verifycontroller } from '../controller/userController.js'
import { checkLogin } from '../middlewares/loginuser.js'
import { userGallaryMulter, userPhotoMulter } from '../utility/usermulter.js'





export const router=express.Router()





 

router.get('/',checkLogin,homeController)
router.get('/login',loginController)
router.post('/login',loginpostController)
router.get('/logout',logoutController)

router.get('/regester',regesterController)
router.post('/regester',regesterpostController)
router.get('/gallary',checkLogin,gallaryController)
router.post('/gallary',userGallaryMulter,gallarypostController)
router.get('/changephoto',checkLogin,photoController)
router.post('/changephoto',userPhotoMulter,photopostController)
router.get('/info',checkLogin,infoController)
router.get('/edit',checkLogin,editController) 
router.post('/edit',checkLogin,editpostController) 
router.get('/changepassword',checkLogin,changePasswordController)
router.post('/changepassword',checkLogin,changePasswordpostController)


router.get('/verify/:id',verifycontroller)
router.get('/verifyme/:id',verfynowcontroller)




 