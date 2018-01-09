/*
 * @Author: Lienren 
 * @Date: 2018-01-08 17:36:54 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-01-09 10:03:08
 */
'use strict';
let MysqlHelper = require('./mysql-helper');

module.exports = function({
  host = '',
  port = 3306,
  user = '',
  password = '',
  database = '',
  charset = 'UTF8_GENERAL_CI',
  dateStrings = true
}) {
  let helper = new MysqlHelper({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
    charset: charset,
    dateStrings: dateStrings
  });
  return helper;
};
