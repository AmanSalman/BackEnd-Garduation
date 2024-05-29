import { Router } from "express";
import * as orderController from './order.controller.js';
import {auth} from '../../middleware/auth.js'
import { permissions } from "./order.role.js";
const router = Router()


router.post ('/', auth(permissions.create), orderController.create)
router.get('/:id', auth(permissions.getAll), orderController.userOrders)
router.get('/getdetails/:id', auth(permissions.getDetails), orderController.orderdetails)
router.get('/orders', auth(permissions.getAll), orderController.orders)
router.patch('/:id', auth(permissions.update), orderController.updateOrderStatus)
router.patch('/', auth(permissions.update), orderController.updateAll)
router.get('/count', auth(permissions.getOrdersCounts), orderController.getOrdersCounts)
// router.get('/pending', auth(permissions.getPending), orderController.getPending)
// router.get('/accept', auth(permissions.getAll), orderController.acceptedOrders)
// router.patch('/:id', auth(permissions.update), orderController.accept)
// router.patch('/reject/:id', auth(permissions.update), orderController.reject)
// router.patch('/delivered/:id', auth(permissions.update), orderController.delivered)
// router.patch('/onway/:id', auth(permissions.update), orderController.onway)
// router.put('/accept', auth(permissions.update), orderController.acceptAll)
// router.put('/reject', auth(permissions.update), orderController.rejectAll)
// router.put('/onwayAll', auth(permissions.update), orderController.onwayAll)
// router.put('/deliveredAll', auth(permissions.update), orderController.deliveredAll)
export default router; 