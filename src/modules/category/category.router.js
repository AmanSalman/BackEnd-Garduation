import { Router } from "express";
import * as categoryController from './category.controller.js';
import fileUpload, { fileType } from "../../utls/multer.js";
const router = Router()


router.post('/',fileUpload(fileType.image).single('image'), categoryController.Create);
router.get('/',categoryController.getAll);
router.get('/active', categoryController.getActive);
router.get('/:id', categoryController.getDetails);
router.patch('/:id', fileUpload(fileType.image).single('image'), categoryController.update);
router.delete('/:id', categoryController.Delete )
export default router;