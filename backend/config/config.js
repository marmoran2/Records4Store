require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'r4s_user',
    password: process.env.DB_PASS || '2ManyKittens!!',
    database: process.env.DB_NAME || 'records4store_dev',
    host: process.env.DB_HOST || 'localhost',
    dialect:  'mysql'
  },
  test: { /* … */ },
  production: { /* … */ }
};
