const express = require('express');
const UsersRouter = express.Router();
const { getUsers } = require('../controllers/users');


UsersRouter.get('/', getUsers);

module.exports = UsersRouter;
