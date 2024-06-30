const express = require('express');
const { Model } = require('objection');
const knexConfig = require('./knexfile');
const { getUsers } = require('./src/controllers/users');
const Router = express.Router();

const NODE_ENV = process.env.NODE_ENV || 'development';
const knex = require('knex')(knexConfig[NODE_ENV]);
Model.knex(knex);

const app = express();
const port = process.env.port || 3000;

app.use(express.json())

const mainRouter = require('./src/routes');
const { printRoutes } = require('./src/utils');

app.use('/', mainRouter);


let server = app.listen(port,() => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server listenning on host: ${host === '::' ? 'localhost': host}:${port}`);
});

printRoutes(app);