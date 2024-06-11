import { Router } from "express";
import * as userController from './user.controller.js';
import { auth } from './../../middleware/auth.js';
import { permissions } from "./user.role.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middleware/validation.js";
import { UserSchema } from "./user.validation.js";
const router = Router()


router.get('/',auth(permissions.get), asyncHandler(userController.getAll));
router.patch('/:id',validation(UserSchema),auth(permissions.Disable), asyncHandler(userController.Disable) );
router.patch('/Activate/:id',validation(UserSchema), auth(permissions.Activate), asyncHandler(userController.Activate) );
router.get('/profile',auth(permissions.Profile), asyncHandler(userController.Profile))
export default router;

 