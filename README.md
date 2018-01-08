# mysql-helper-simple

this is a mysql helper simple plug-in

# Installation

```bash
$ npm install mysql-helper-simple
```

# Examples

Before running the examples ensure you have [mysql-helper-simple](https://www.npmjs.com/package/mysql-helper-simple) installed and enabled at the top of your script:

```bash
const sqlhelper = require("mysql-helper-simple");
sqlhelper.init({
  "host": "localhost",
  "user": "root",
  "password": "123456",
  "database": "mydb"});
```

other config

```bash
{
  host: host,
  port: port,
  user: user,
  password: password,
  database: database,
  charset: charset,
  dateStrings: dateStrings
}
```

## Query

```bash
var sql = "select * from users";
sqlhelper.query({
  sql: sql
}).then(result => {
  console.log(result);
});
```

## Create

```bash
var sql = "insert into users (uname) values ('lienren')";
sqlhelper.create({
  sql: sql
}).then(result => {
  console.log(result);
  // return LAST_INSERT_ID() as id
});
```

## Update

```bash
var sql = "update users set name = 'hello lienren' where id = 1";
sqlhelper.update({
  sql: sql
}).then(result => {
  console.log(result);
  // return mysql_affected_rows()
});
```

## Support [Squel](https://www.npmjs.com/package/squel)

Before running the examples ensure you have squel installed and enabled at the top of your script:

```bash
var squel = require("squel");
```

### Query

```bash
var sql = squel.select().from('users').toParam();
sqlhelper.query({
  sql: sql.text,
  values: sql.values
}).then(result => {
  console.log(result);
});
```

# License

MIT - see LICENSE.md
