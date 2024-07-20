const Joi = require('@hapi/joi');

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const postalCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

const signupValidation = Joi.object({
    email: Joi.string().email().required(),
    first_name: Joi.string().required(), 
    last_name: Joi.string().required(), 
    username: Joi.string()
    .regex(/^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9])*$/)
    .required()
    .messages({
      'string.base': 'Username should be a type of text',
      'string.empty': 'Username is not allowed to be empty',
      'string.min': 'Username should have a minimum length of {#limit}',
      'string.max': 'Username should have a maximum length of {#limit}',
      'string.pattern.base': 'Username can only contain alphanumeric characters, underscores, hyphens, and periods, and cannot start or end with a special character or have consecutive special characters',
      'any.required': 'Username is required'
    }),
    password: Joi.string().regex(passwordRegex),
    birthday: Joi.date().max(new Date(Date.now() - 60 * 60 * 24 * 365 * 18 * 1000)).required("You must be at least 18 years old"),
    gender: Joi.string().valid('MALE', 'FEMALE'),
    address: Joi.object({
        address_line1: Joi.string().required(),
        address_line2: Joi.string(), 
        state: Joi.string().required(), 
        city: Joi.string().required(), 
        postal_code: Joi.string().regex(postalCodeRegex).required(), 
        country: Joi.string().valid("United States")
    })
})

module.exports = signupValidation;