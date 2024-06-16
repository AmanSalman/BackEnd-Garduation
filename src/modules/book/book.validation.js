import Joi from "joi";

export const CreateBookSchema = Joi.object({
  isbn: Joi.string().required(),
  title:Joi.string().min(3).required(),
  description:Joi.string().required(),
  stock:Joi.number().min(1).default(1).required(),
  price:Joi.number().required(),
  Discount:Joi.number().min(0).default(0).optional(),
  publishingHouse:Joi.string().required(),
  status:Joi.string().valid('Active', 'Disabled').default('Active').optional(),
  categoryName:Joi.string().required(),
  mainImage:Joi.array().items({
    fieldname:Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5000000).required(),
  }).required(),
  subImages:Joi.array().items(
    Joi.object({
      fieldname:Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(),
      size: Joi.number().max(5000000).required(),
    })
  ).max(10).optional()
});


export const IdValidationSchema = Joi.object({
  id:Joi.string().hex().length(24).required(),
});

export const deleteValidationSchema = Joi.object({
  id:Joi.string().hex().length(24).required(),
  public_id:Joi.string().required()
});


export const UpdateBookSchema = Joi.object({
  id:Joi.string().hex().length(24),
  isbn: Joi.string(),
  title:Joi.string().min(3),
  description:Joi.string(),
  stock:Joi.number().min(1).default(1),
  price:Joi.number(),
  Discount:Joi.number().min(0).default(0),
  publishingHouse:Joi.string(),
  status:Joi.string().valid('Active', 'Disabled'),
  categoryId:Joi.string().hex().length(24).optional(),
  mainImage:Joi.array().items({
    fieldname:Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5000000).required(),
  }),
});




export const UpdateSubImagesSchema = Joi.object({
  id:Joi.string().hex().length(24),
  subImages:Joi.array().items(
    Joi.object({
      fieldname:Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().valid('image/png', 'image/jpeg', 'image/webp').required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(),
      size: Joi.number().max(5000000).required(),
    })
  ).max(10).required()
});
