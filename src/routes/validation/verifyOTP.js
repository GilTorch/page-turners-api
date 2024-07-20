
const Joi = require("@hapi/joi");

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const verifyOTPValidation = Joi.object({
  email: Joi.string().email().required(), 
  password: Joi.string().regex(passwordRegex).required(),
  otp: Joi.string().required()
})

module.exports = verifyOTPValidation