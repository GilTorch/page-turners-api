const { authenticateToken } = require('../utils/auth');
const {
    AuthRouter,
    UsersRouter
} = require('./routers');

const express = require('express');
const router = express.Router();




router.use('/auth', AuthRouter);
router.use('/users', authenticateToken, UsersRouter)




module.exports = router;