import { Router } from "express";
import * as categoryController from './category.controller.js';
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from "../../middleware/auth.js";
import { permissions } from "./category.role.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from './../../middleware/validation.js';
import { CreateCategorySchema, DeleteCategorySchema, UpdateCategorySchema } from "./category.validation.js";
const router = Router()


router.post('/',fileUpload(fileType.image).single('image'),auth(permissions.create),validation(CreateCategorySchema),asyncHandler(categoryController.Create) );

router.get('/',auth(permissions.getAll), asyncHandler(categoryController.getAll));
router.get('/books/:id',validation(DeleteCategorySchema), asyncHandler(categoryController.getbooks) );
router.get('/active', asyncHandler(categoryController.getActive) );
router.get('/:id', auth(permissions.getDetails),validation(DeleteCategorySchema), asyncHandler(categoryController.getDetails) );
router.patch('/:id',validation(UpdateCategorySchema),fileUpload(fileType.image).single('image'), asyncHandler(categoryController.update));
router.delete('/:id', auth(permissions.delete) ,validation(DeleteCategorySchema), asyncHandler(categoryController.Delete))
export default router;   
 