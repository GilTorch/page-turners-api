// Update with your config settings.
const config = require('./config/db');

console.log(`CONFIG`, config);


module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: config['DB_HOST'],
      port: config['DB_PORT'],
      user: config['DB_USER'],
      database: config['DB_NAME'],
      password: config['DB_PASSWORD'],
      ssl: config['DB_SSL'] ? { rejectUnauthorized: false } : false,
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
