const express = require('express');
const AuthRouter = express.Router();
const { login, refreshToken, deleteRefreshToken } = require('../controllers/auth');



AuthRouter.post('/login', login);
AuthRouter.post('/token', refreshToken);
AuthRouter.delete('/logout', deleteRefreshToken);



module.exports = AuthRouter;