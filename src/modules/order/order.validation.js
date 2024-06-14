import Joi from "joi";

export const OrderSchema = Joi.object({
  couponName:Joi.string().min(3).optional(),
  bookId:Joi.string().hex().length(24),
  phone: Joi.string().pattern(/^(?:\+972|0)?[5-9]\d{8}$|^(?:\+970|0)?[5-9]\d{8}$/).required(),
  Address: Joi.string().required(),
});