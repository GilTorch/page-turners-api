const express = require('express');
const AuthRouter = express.Router();
const { login, signup, refreshToken, deleteRefreshToken, sendOtp, verifyOtp } = require('../controllers/auth');
const { signupValidation, verifyOTPValidation, sendOTPValidation} = require('./validation');
const validate = require('../middlewares/validate');
const { verify } = require('jsonwebtoken');


AuthRouter.post('/signup', validate(signupValidation), signup);
AuthRouter.post('/login', login);
AuthRouter.post('/token', refreshToken);
AuthRouter.delete('/logout', deleteRefreshToken);
AuthRouter.post('/send-otp', validate(sendOTPValidation), sendOtp);
AuthRouter.post('/verify-otp',validate(verifyOTPValidation), verifyOtp);



module.exports = AuthRouter;