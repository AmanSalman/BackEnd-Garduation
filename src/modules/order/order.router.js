import { Router } from "express";
import * as orderController from './order.controller.js';
import {auth} from '../../middleware/auth.js'
import { permissions } from "./order.role.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from './../../middleware/validation.js';
import { OrderSchema } from "./order.validation.js";
const router = Router()


router.post ('/', validation(OrderSchema), auth(permissions.create), asyncHandler(orderController.create))
router.patch('/', auth(permissions.update), asyncHandler(orderController.updateAll) )
router.patch('/:id', auth(permissions.update), asyncHandler(orderController.updateOrderStatus) )
router.get('/count', auth(permissions.getOrdersCounts), asyncHandler(orderController.getOrdersCounts) )
router.get('/orders', auth(permissions.getAll), asyncHandler(orderController.orders) )
router.get('/sales-data', asyncHandler(orderController.sales))
router.get('/userOrders', auth(permissions.create), asyncHandler(orderController.userOrders) )
router.get('/getdetails/:id', auth(permissions.getDetails), asyncHandler(orderController.orderdetails))
router.get('/admin/userorders/:id', auth(permissions.getuserorders), asyncHandler(orderController.userOrdersAdmin))
export default router; 