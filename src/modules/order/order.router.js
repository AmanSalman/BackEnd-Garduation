import { Router } from "express";
import * as orderController from './order.controller.js';
import {auth} from '../../middleware/auth.js'
import { permissions } from "./order.role.js";
const router = Router()


router.post ('/', auth(permissions.create), orderController.create)
router.get('/getdetails/:id', auth(permissions.getDetails), orderController.orderdetails)
router.get('/count', auth(permissions.getOrdersCounts), orderController.getOrdersCounts)
router.get('/orders', auth(permissions.getAll), orderController.orders)
router.get('/pending', auth(permissions.getPending), orderController.getPending)
router.get('/accept', auth(permissions.getAll), orderController.acceptedOrders)
router.patch('/:id', auth(permissions.update), orderController.accept)
router.patch('/reject/:id', auth(permissions.update), orderController.reject)
router.patch('/delivered/:id', auth(permissions.update), orderController.delivered)
router.patch('/onway/:id', auth(permissions.update), orderController.onway)
export default router; 