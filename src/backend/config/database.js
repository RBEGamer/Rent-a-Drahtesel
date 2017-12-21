// config/database.js
var mysql     =    require('mysql');
var cred = require('./credentials.js');

var pool = mysql.createPool({
    connectionLimit : 512,
    host     : cred.database.host,
    user     : cred.database.user,
    password : cred.database.password,
    database : cred.database.database,
    debug    :  false
});

module.exports = pool;
