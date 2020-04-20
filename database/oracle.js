// https://dzone.com/articles/how-to-interact-with-a-database-using-async-functi
// https://blogs.oracle.com/oraclemagazine/keep-your-nodejs-promises
// https://github.com/oracle/node-oracledb/blob/master/examples/sessionfixup.js
const oracledb = require('oracledb');

class Database {
  constructor() {
    this.db = oracledb;
    this.db.createPool({
      // user: "sys",
      // password: "Init02401",
      user: 'idirect1',
      password: 'idirect1', // 要給這個user select(SYS.tablename)/connect的權限
      connectString: '192.168.50.20:1521/DZConnect',
      externalAuth: false,
      poolMin: 1,
      poolMax: 4,
      poolIncrement: 1,
    });
  }


  async query(sql, args) {
    let connection;
    return new Promise(async (resolve, reject) => {
      try {
        // Get a connection from the default connection pool
        // connection = await this.db.getConnection({privilege: 2});
        // console.log('oracle start')
        connection = await this.db.getConnection();
        // console.log('oracle get connect')
        const result = await connection.execute(sql, args);
        resolve(result);
      } catch (err) {
        reject(err);
      } finally {
        if (connection) {
          try {
            // console.log('oracle disconnect')
            await connection.close(); // Put the connection back in the pool
          } catch (err) {
            reject(err);
          }
        }
      }
    });
  }

  async closePoolAndExit() {
    console.log('\nTerminating');
    try {
      // Get the 'default' pool from the pool cache and close it (force
      // closed after 3 seconds).
      // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file
      await oracledb.getPool().close(3);
      process.exit(0);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }
}

module.exports = Database;
