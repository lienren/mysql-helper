/*
 * @Author: Lienren 
 * @Date: 2018-01-08 17:36:54 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-01-10 17:16:34
 */
'use strict';
const mysql = require('mysql');

class MysqlHelper {
  constructor({
    host = '',
    port = 3306,
    user = '',
    password = '',
    database = '',
    charset = 'UTF8_GENERAL_CI',
    dateStrings = true
  }) {
    this.default_mysql_connection_config = {
      ...{
        host: host,
        port: port,
        user: user,
        password: password,
        database: database,
        charset: charset,
        dateStrings: dateStrings
      }
    };
  }
  open() {
    this.connection = mysql.createConnection(this.default_mysql_connection_config);
    this.connection.connect();
    return this;
  }
  close() {
    if (this.connection) {
      this.connection.end();
    }
    return this;
  }
  execute({ sql, values, callback = result => {} }) {
    if (values) {
      sql = mysql.format(sql, values);
    }

    this.connection.query(sql, (err, rows, fields) => {
      callback({ err: err, rows: rows, fields: fields });
    });
    return this;
  }
  query({ sql, values }) {
    return new Promise((resolve, reject) => {
      this.open()
        .execute({
          sql: sql,
          values: values,
          callback: result => {
            if (result.err) {
              reject(result.err);
            } else {
              resolve(result.rows);
            }
          }
        })
        .close();
    });
  }
  create({ sql, values }) {
    let get_auto_id = 'SELECT LAST_INSERT_ID() as id;';
    return new Promise((resolve, reject) => {
      this.open()
        .execute({
          sql: sql,
          values: values,
          callback: result => {
            if (result.err) {
              reject(result.err);
            }
          }
        })
        .execute({
          sql: get_auto_id,
          callback: result => {
            if (result.err) {
              reject(result.err);
            } else {
              resolve(result.rows);
            }
          }
        })
        .close();
    });
  }
  update({ sql, values }) {
    return new Promise((resolve, reject) => {
      this.open()
        .execute({
          sql: sql,
          values: values,
          callback: result => {
            if (result.err) {
              reject(result.err);
            } else {
              resolve({ rows: result.rows.affectedRows });
            }
          }
        })
        .close();
    });
  }
  batch(executes) {
    return Promise.all(executes);
  }
}

module.exports = ({
  host = '',
  port = 3306,
  user = '',
  password = '',
  database = '',
  charset = 'UTF8_GENERAL_CI',
  dateStrings = true
}) => {
  return new MysqlHelper({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
    charset: charset,
    dateStrings: dateStrings
  });
};
