import { Router } from "express";
import * as categoryController from './category.controller.js';
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from "../../middleware/auth.js";
import { permissions } from "./category.role.js";
const router = Router()


router.post('/',auth(permissions.create),fileUpload(fileType.image).single('image'), categoryController.Create);
router.get('/',auth(permissions.getAll),categoryController.getAll);
router.get('/books/:id', categoryController.getbooks);
router.get('/active', categoryController.getActive);
router.get('/:id', auth(permissions.getDetails), categoryController.getDetails);
router.patch('/:id', auth(permissions.update),fileUpload(fileType.image).single('image'), categoryController.update);
router.delete('/:id', auth(permissions.delete) , categoryController.Delete )
export default router;   
