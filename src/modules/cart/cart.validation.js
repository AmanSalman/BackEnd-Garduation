import Joi from "joi";

export const CartSchema = Joi.object({
  bookId:Joi.string().hex().length(24)
});



