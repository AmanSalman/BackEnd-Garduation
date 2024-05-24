import { Router } from "express";
import * as orderController from './order.controller.js';
import {auth} from '../../middleware/auth.js'
import { permissions } from "./order.role.js";
const router = Router()


router.post ('/', auth(permissions.create), orderController.create )
export default router;