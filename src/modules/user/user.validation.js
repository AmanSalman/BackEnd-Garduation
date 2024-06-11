import Joi from "joi";

export const UserSchema = Joi.object({
  id:Joi.string().hex().length(24)
});



