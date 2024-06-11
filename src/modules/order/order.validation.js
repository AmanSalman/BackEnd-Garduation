import Joi from "joi";

export const CartSchema = Joi.object({
  couponName:Joi.string().optional(),
  bookId:Joi.string().hex().length(24),
  phone: Joi.string().pattern(/^(?:\+972|0)?[5-9]\d{8}$|^(?:\+970|0)?[5-9]\d{8}$/).required(),
  Address: Joi.string().required(),
});