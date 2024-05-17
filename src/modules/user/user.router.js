import { Router } from "express";
import * as userController from './user.controller.js';
import { auth } from './../../middleware/auth.js';
import { permissions } from "./user.role.js";
const router = Router()


router.get('/',auth(permissions.get), userController.getAll);
router.patch('/:id',auth(permissions.Disable), userController.Disable);
router.patch('/Activate/:id', auth(permissions.Activate), userController.Activate);
router.get('/profile',auth(permissions.Profile), userController.Profile)
export default router; 

 