// config/database.js
var mysql     =    require('mysql');


var database = {
	 connection: {
        host: 'marcelochsendorf.com',
        user: 'rent_a_bike',
        password: 'bike_a_rent'
    },
	database: 'rent_a_bike',
}


var pool =    mysql.createPool({
    connectionLimit : 512,
    host     : database.connection.host,
    user     : database.connection.user,
    password : database.connection.password,
    database : database.database,
    debug    :  false
});


module.exports = pool
module.exports =  database;
