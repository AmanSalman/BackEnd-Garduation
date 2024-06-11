import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]+$/).required(),
  phone: Joi.string().pattern(/^(?:\+972|0)?[5-9]\d{8}$|^(?:\+970|0)?[5-9]\d{8}$/).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]+$/).required(),
});


export const sendCodeSchema = Joi.object({
  email: Joi.string().email().required(),
});


export const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]+$/).required(),
  code: Joi.string().length(4).required(),
});



export const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^(?:\+972|0)?[5-9]\d{8}$|^(?:\+970|0)?[5-9]\d{8}$/)
});


export const ChangePasswordSchema = Joi.object({
  oldPassword: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]+$/).required(),
  newPassword: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]+$/).required(),
});

