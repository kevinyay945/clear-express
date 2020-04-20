// 參考https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
// https://medium.com/%E4%B8%80%E5%80%8B%E5%B0%8F%E5%B0%8F%E5%B7%A5%E7%A8%8B%E5%B8%AB%E7%9A%84%E9%9A%A8%E6%89%8B%E7%AD%86%E8%A8%98/nodejs-%E8%A7%A3%E6%B1%BAmysql-error-connection-lost-the-server-closed-the-connection%E7%9A%84%E6%96%B9%E6%B3%95-d374bdddf9c1
const mysql = require('mysql');

class Database {
  constructor() {
    // this.connection = mysql.createConnection({
    //   host     : 'localhost',
    //   user     : 'root',
    //   password : 'root',
    //   database: "idirect1"
    // });
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'idirect1',
      connectionLimit: 10,
    });
  }

  async query(sql, args) {
    return new Promise((resolve, reject) => {
      // console.log('mysql start')
      this.pool.getConnection((err, conn) => {
        // console.log('mysql get connect')
        if (conn) {
          conn.query(sql, args, (err1, rows) => {
            if (err) return reject(err1);
            resolve(rows);
            return 0;
          });
          conn.release();
          // console.log('mysql con release')
        } else {
          reject('mysql not working');
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve();
        return 0;
      });
    });
  }
}
module.exports = Database;
