import { Router } from "express";
import * as authController from './auth.controller.js';
import { permissions } from "./auth.role.js";
import { auth } from "../../middleware/auth.js";
const router = Router()

router.post ('/register', authController.register);
router.post('/login', authController.login);
router.patch('/sendCode', authController.sendCode )
router.patch('/forgetPassword' , authController.forgetPassword)
router.patch('/update', auth(permissions.update) , authController.UpdateProfile)
export default router; 
