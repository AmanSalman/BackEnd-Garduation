import { Router } from "express";
import * as categoryController from './category.controller.js';
import fileUpload, { fileType } from "../../utls/multer.js";
const router = Router()


router.post('/',fileUpload(fileType.image).single('image'), categoryController.Create)
export default router;