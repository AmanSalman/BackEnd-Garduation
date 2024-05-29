import { Router } from "express";
import * as wishlistController from './wishlist.controller.js';
import { auth } from "../../middleware/auth.js";
import { permissions } from "./wishlist.role.js";
const router = Router()

router.post('/', auth(permissions.create), wishlistController.Create)
router.put('/:bookId', auth(permissions.delete), wishlistController.Remove)
router.put('/', auth(permissions.clearCart), wishlistController.Clear)
router.get('/', auth(permissions.get), wishlistController.Get)

export default router;