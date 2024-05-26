import { Router } from "express";
import * as orderController from './order.controller.js';
import {auth} from '../../middleware/auth.js'
import { permissions } from "./order.role.js";
const router = Router()


router.post ('/', auth(permissions.create), orderController.create )
router.get('/pending', auth(permissions.getPending), orderController.getPending)
router.get('/accept', auth(permissions.getAll), orderController.acceptedOrders)
router.patch('/onway/:id', auth(permissions.update), orderController.onWay)
router.patch('/:id', auth(permissions.update), orderController.accept)
export default router;