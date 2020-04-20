// http://vitaly-t.github.io/pg-promise/
// https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example
const pgp = require('pg-promise')();
const config = require('config');

const dbConnect = config.get('database.postgresql');
const db = pgp(`postgresql://${dbConnect.user}:${dbConnect.password}@${dbConnect.host}:${dbConnect.port}/${dbConnect.defaultDb}?ssl=${dbConnect.ssl}`);

module.exports = db;
