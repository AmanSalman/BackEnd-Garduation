import { Router } from "express";
import * as reviewController from './review.controller.js';
import { permissions } from "./review.role.js";
import { auth } from "../../middleware/auth.js";
const router = Router({mergeParams:true})

router.post('/', auth(permissions.create), reviewController.create );


export default router;