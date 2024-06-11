import Joi from "joi";

export const WishlistSchema = Joi.object({
  bookId:Joi.string().hex().length(24)
});



