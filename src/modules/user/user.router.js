import { Router } from "express";
import * as userController from './user.controller.js';
import { auth } from './../../middleware/auth.js';
const router = Router()


router.get('/',auth(), userController.getAll);

export default router; 