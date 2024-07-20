const Joi = require('@hapi/joi');

const sendOTP = Joi.object({
    email: Joi.string().required()
})

module.exports = sendOTP;