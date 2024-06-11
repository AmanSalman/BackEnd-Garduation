import Joi from "joi";




export const CreateCategorySchema = Joi.object({
  name:Joi.string().min(3).required(),
  image:Joi.object({
    fieldname:Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5000000).required(),
  }).required()
});

export const DeleteCategorySchema = Joi.object({
  id:Joi.string().hex().length(24)
});

export const UpdateCategorySchema = Joi.object({
  id:Joi.string().hex().length(24),
  name:Joi.string().min(3).optional(),
  status:Joi.string().valid('active', 'inactive').optional(),
  image:Joi.object({
    fieldname:Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5000000).required(),
  }).optional()
});


