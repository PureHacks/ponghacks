var mysql = require('mysql');
var exports = module.exports = {};

var pool = mysql.createPool({
			  connectionLimit : 80,
              host     : 'localhost',
              user     : 'root',
              password : 'root',
              port: 8889,
              database: "PongHacks"
              //,debug: true
            });

exports.query = function(query, callback) {
	pool.query(query, function(err, rows, fields) {
    if (err) throw err;
    callback(err, rows, fields);
  });
};

exports.queryByValue = function(query, data, callback) {
  pool.query(query, [data], function(err, rows, fields) {
    if (err) throw err;
    callback(err, rows, fields);
  });
};

exports.insertObject = function(tableName, obj, callback) {
  pool.query("INSERT INTO " + tableName + " SET ?", obj, function(err, result, fields) {
    if (err) throw err;
    callback(err, result, fields);
  });
};