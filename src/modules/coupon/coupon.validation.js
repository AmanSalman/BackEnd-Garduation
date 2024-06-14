import Joi from "joi";

export const createCouponSchema = Joi.object({
  name:Joi.string().min(3).required(),
  Amount: Joi.number().integer().positive().min(1).max(50).required(),
  status:Joi.string().valid('active','inactive').required()
})





export const updateCouponSchema = Joi.object({
  id:Joi.string().hex().length(24).required(),
  name:Joi.string().min(3),
  Amount: Joi.number().integer().positive().min(1).max(50),
  status:Joi.string().valid('active','inactive')
})


export const DeleteSchema = Joi.object({
  id:Joi.string().hex().length(24)
});
