import express from 'express'
import { Login, Logout, Register, updateProfile } from '../controllers/Auth.js'
import { profileUpload } from '../middleware/Multer.js'
import { isLogin } from '../middleware/CheckAdmin.js'

const AuthRoutes=express.Router()


AuthRoutes.post('/register',profileUpload,Register)
AuthRoutes.post('/login',Login)
AuthRoutes.patch('/profile/:id',profileUpload,isLogin,updateProfile)
AuthRoutes.post('/logout',Logout)

export default AuthRoutes
