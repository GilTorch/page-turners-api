const express = require('express');
const AuthRouter = express.Router();
const { login, signup, refreshToken, deleteRefreshToken, sendOtp, verifyOtp } = require('../controllers/auth');
const signupValidation = require('./validation/signup');
const validate = require('../middlewares/validate');
const { verify } = require('jsonwebtoken');


AuthRouter.post('/signup', validate(signupValidation), signup);
AuthRouter.post('/login', login);
AuthRouter.post('/token', refreshToken);
AuthRouter.delete('/logout', deleteRefreshToken);
AuthRouter.post('/send-otp', sendOtp);
AuthRouter.post('/verify-otp', verifyOtp);



module.exports = AuthRouter;