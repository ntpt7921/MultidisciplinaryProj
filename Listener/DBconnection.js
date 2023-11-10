const mysql = require('mysql');
var db_config = {
    host: "127.0.0.1",
    user: "root",
    password: "dadn_bk231",
    database: "dadn"
};

var con = mysql.createPool(db_config);

module.exports = con;