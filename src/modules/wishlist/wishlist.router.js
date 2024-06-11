import { Router } from "express";
import * as wishlistController from './wishlist.controller.js';
import { auth } from "../../middleware/auth.js";
import { permissions } from "./wishlist.role.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middleware/validation.js";
import { WishlistSchema } from "./wishlist.validation.js";
const router = Router()

router.post('/',validation(WishlistSchema), auth(permissions.create), asyncHandler(wishlistController.Create) )
router.put('/:bookId',validation(WishlistSchema), auth(permissions.delete), asyncHandler(wishlistController.Remove) )
router.put('/', auth(permissions.clearCart), asyncHandler(wishlistController.Clear) )
router.get('/', auth(permissions.get), asyncHandler(wishlistController.Get) )

export default router;