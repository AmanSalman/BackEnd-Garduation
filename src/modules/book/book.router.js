import { Router } from "express";
import * as bookController from './book.controller.js';
import fileUpload, { fileType } from "../../utls/multer.js";
import { auth } from './../../middleware/auth.js';
import { permissions } from "./book.role.js";
import ReviewRouter from '../review/review.router.js'
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middleware/validation.js";
import { CreateBookSchema, IdValidationSchema,deleteValidationSchema, UpdateBookSchema, UpdateSubImagesSchema } from "./book.validation.js";
const router = Router()

router.use('/:bookId/review', ReviewRouter )

router.post('/',auth(permissions.create),fileUpload(fileType.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 10 }
]),  validation(CreateBookSchema), asyncHandler(bookController.Create));


router.get('/', auth(permissions.getAll), asyncHandler (bookController.getAll));
router.get('/Active', asyncHandler (bookController.getActive))
router.get('/:id',validation(IdValidationSchema), asyncHandler (bookController.getDetails));

// router.patch('/:id', auth(),fileUpload(fileType.image).single('image'), bookController.update);
router.delete('/:id', validation(IdValidationSchema),  auth(permissions.delete) , asyncHandler (bookController.Delete));
router.delete('/deleteSubimage/:id', validation(deleteValidationSchema), auth(permissions.delete), asyncHandler (bookController.deleteSubImage));
router.patch('/:id', auth(permissions.update), fileUpload(fileType.image).single('mainImage'), validation(UpdateBookSchema), asyncHandler( bookController.Update))

router.patch ('/:id/subimage',fileUpload(fileType.image).fields([
    { name: 'subImages', maxCount: 10 }
]),validation(UpdateSubImagesSchema), auth(permissions.update), asyncHandler (bookController.addsubimage))


export default router;
