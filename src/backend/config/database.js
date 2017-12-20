// config/database.js

var database = {
	 connection: {
        host: 'marcelochsendorf.com',
        user: 'swe_project',
        password: 'swe_project'
    },
	database: 'swe_project',
    users_table: 'tbl_benutzer',
    orders_table: 'tbl_bestellung',
    ratings_table: 'tbl_ratings',
    inserat_table: 'tbl_inserat',
    tbl_plz: 'tbl_plz',
    tbl_typ: 'tbl_type',
    tbl_log: 'tbl_log' 

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