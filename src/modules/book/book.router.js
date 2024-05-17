import { Router } from "express";
import * as bookController from './book.controller.js';
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from './../../middleware/auth.js';
import { permissions } from "./book.role.js";
const router = Router()


router.post('/',auth(permissions.create),fileUpload(fileType.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 7 }
]), bookController.Create);
router.get('/', auth(permissions.getAll),bookController.getAll);
router.get('/:id',auth(permissions.getDetails), bookController.getDetails);
// router.patch('/:id', auth(),fileUpload(fileType.image).single('image'), bookController.update);
router.delete('/:id', auth(permissions.delete) , bookController.Delete);
router.patch('/:id', auth(permissions.update), fileUpload(fileType.image).single('image'), bookController.Update )
export default router; 