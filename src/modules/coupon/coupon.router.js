import { Router } from "express";
import * as couponController from './coupon.controller.js';
import { auth } from "../../middleware/auth.js";
import { permissions } from "./coupon.role.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from './../../middleware/validation.js';
import { DeleteSchema, createCouponSchema, updateCouponSchema } from "./coupon.validation.js";
const router = Router()

router.post('/',validation(createCouponSchema), auth(permissions.create), asyncHandler(couponController.create) )
router.get('/', auth(permissions.getAll), asyncHandler(couponController.getAll) )
router.delete('/:id',validation(DeleteSchema), auth(permissions.delete), asyncHandler(couponController.deleteCoupon))
router.patch('/:id', validation(updateCouponSchema), auth(permissions.update), asyncHandler(couponController.updateCoupon))
router.get('/:id',validation(DeleteSchema), auth(permissions.getDetails), asyncHandler(couponController.getCoupon))

export default router;