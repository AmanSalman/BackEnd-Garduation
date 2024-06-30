import { Router } from "express";
import * as authController from './auth.controller.js';
import { permissions } from "./auth.role.js";
import { auth } from "../../middleware/auth.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { asyncHandler } from "../../utls/catchError.js";
import { forgetPasswordSchema, loginSchema, registerSchema, sendCodeSchema, updateProfileSchema, ChangePasswordSchema } from "./auth.validation.js";
import { validation } from "../../middleware/validation.js";

const router = Router()


router.post ('/register',checkEmail,validation(registerSchema),asyncHandler(authController.register) );
router.post('/login', validation(loginSchema), asyncHandler(authController.login));
router.patch('/sendCode',validation(sendCodeSchema), asyncHandler(authController.sendCode) )
router.patch('/forgetPassword', validation(forgetPasswordSchema) , asyncHandler(authController.forgetPassword))
router.patch('/update',validation(updateProfileSchema), auth(permissions.update) , asyncHandler(authController.UpdateProfile))
router.patch('/changePassword', validation(ChangePasswordSchema) , auth(permissions.changePassword) , asyncHandler(authController.updatePassword))
router.get('/confirmEmail/:token', asyncHandler( authController.confirmEmail));
export default router; 
