import { Router } from "express";
import * as reviewController from './review.controller.js';
import { permissions } from "./review.role.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utls/catchError.js";
import { validation } from "../../middleware/validation.js";
import { DeleteGetReviewSchema, reviewSchema } from "./review.validation.js";
const router = Router({mergeParams:true})

router.post('/',validation(reviewSchema), auth(permissions.create), asyncHandler(reviewController.create)  );
router.delete('/:id', validation(DeleteGetReviewSchema), auth(permissions.delete), asyncHandler(reviewController.remove) )
router.get('/:id', validation(DeleteGetReviewSchema), auth(permissions.getAll), asyncHandler(reviewController.get) )
export default router;