import { Router } from "express";
import * as cartController from './cart.controller.js';
import { auth } from "../../middleware/auth.js";
import { permissions } from "./cart.role.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middleware/validation.js";
import { CartSchema } from "./cart.validation.js";
const router = Router()

router.post('/', auth(permissions.create),validation(CartSchema) ,asyncHandler( cartController.Create))
router.put('/:bookId', validation(CartSchema) , auth(permissions.delete), asyncHandler( cartController.Remove))
router.put('/', auth(permissions.clearCart), asyncHandler(cartController.Clear))
router.get('/', auth(permissions.get), asyncHandler(cartController.Get))
router.post('/increaseQty/:bookId', validation(CartSchema) , auth(permissions.ChangeQty), asyncHandler(cartController.increaseQty))
router.post('/decreaseQty/:bookId', validation(CartSchema) , auth(permissions.ChangeQty), asyncHandler(cartController.decreaseQty))

export default router;