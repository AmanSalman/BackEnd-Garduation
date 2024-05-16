import { Router } from "express";
import * as cartController from './cart.controller.js';
import { auth } from "../../middleware/auth.js";
import { permissions } from "./cart.role.js";
const router = Router()

router.post('/', auth(permissions.create), cartController.Create)
router.put('/:bookId', auth(permissions.delete), cartController.Remove)
router.put('/', auth(permissions.clearCart), cartController.Clear)
router.get('/', auth(permissions.get), cartController.Get)
router.post('/increaseQty/:bookId', auth(permissions.ChangeQty), cartController.increaseQty)
router.post('/decreaseQty/:bookId', auth(permissions.ChangeQty), cartController.decreaseQty)

export default router;