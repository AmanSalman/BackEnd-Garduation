import { Router } from "express";
import * as bookController from './book.controller.js';
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from './../../middleware/auth.js';
const router = Router()


router.post('/',auth(),fileUpload(fileType.image).single('image'), bookController.Create);
router.get('/', auth(),bookController.getAll);
router.get('/:id', bookController.getDetails);
// router.patch('/:id', auth(),fileUpload(fileType.image).single('image'), bookController.update);
router.delete('/:id', bookController.Delete);
router.patch('/:id', auth(), fileUpload(fileType.image).single('image'), bookController.Update )
export default router;