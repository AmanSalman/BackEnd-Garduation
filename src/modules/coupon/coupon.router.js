import { Router } from "express";
import * as couponController from './coupon.controller.js';
import { auth } from "../../middleware/auth.js";
import { permissions } from "./coupon.role.js";
const router = Router()

router.post('/', auth(permissions.create), couponController.create)
router.get('/', auth(permissions.getAll), couponController.getAll)
router.delete('/:id', auth(permissions.delete), couponController.deleteCoupon)
router.patch('/:id', auth(permissions.update), couponController.updateCoupon)
router.get('/:id', auth(permissions.getDetails), couponController.getCoupon)

export default router;