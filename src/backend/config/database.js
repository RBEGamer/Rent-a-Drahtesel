// config/database.js
var mysql     =    require('mysql');
var cred = require('./credentials.js');

var pool = mysql.createPool({
    connectionLimit : 512,
    host     : cred.credentials.database.host,
    user     : cred.credentials.database.user,
    password : cred.credentials.database.password,
    database : cred.credentials.database.database,
    debug    :  false
});

module.exports = pool;
