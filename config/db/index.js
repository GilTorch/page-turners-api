require('dotenv').config();

const config = {
   // 'DATABASE_URL': process.env.DATABASE_URL,
   'DB_HOST': process.env.DB_HOST,
   'DB_NAME': process.env.DB_NAME,
   'DB_USER': process.env.DB_USER,
   'DB_PASSWORD': process.env.DB_PASSWORD,
   'DB_PORT': process.env.DB_PORT,
}

module.exports = config;