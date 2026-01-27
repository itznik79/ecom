import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .required(),

  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    )
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain uppercase, lowercase, number and special character',
    }),

  first_name: Joi.string()
    .min(2)
    .max(50)
    .required(),

  last_name: Joi.string()
    .min(2)
    .max(50)
    .required(),

  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid Indian phone number',
    }),

  otp: Joi.string()
    .length(6)
    .required(),

  terms_accepted: Joi.boolean()
    .valid(true)
    .required()
    .messages({
      'any.only': 'You must accept terms and conditions',
    }),

  marketing_opt_in: Joi.boolean().default(false),
});
