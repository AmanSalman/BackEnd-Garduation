import Joi from 'joi';

export const reviewSchema = Joi.object({
  comment: Joi.string().min(5).max(500).required().messages({
    'string.base': 'Comment should be a type of text',
    'string.empty': 'Comment cannot be an empty field',
    'string.min': 'Comment should have a minimum length of 5 characters',
    'string.max': 'Comment should have a maximum length of 500 characters',
    'any.required': 'Comment is a required field'
}),
    rating: Joi.number().integer().min(1).max(5).required().messages({
        'number.base': 'Rating should be a type of number',
        'number.empty': 'Rating cannot be an empty field',
        'number.min': 'Rating should be at least 1',
        'number.max': 'Rating should be at most 5',
        'any.required': 'Rating is a required field'
    }),
    bookId: Joi.string().hex().length(24).required().messages({
        'string.pattern.base': 'Invalid book ID',
        'any.required': 'Book ID is a required field'
    })
});


export const DeleteGetReviewSchema = Joi.object({
  id:Joi.string().hex().length(24)
});

