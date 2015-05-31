var mysql = require('mysql');
var exports = module.exports = {};

var pool = mysql.createPool({
			  connectionLimit : 80,
              host     : 'localhost',
              user     : 'root',
              password : 'root',
              port: 8889,
              database: "PongHacks"
            });

exports.query = function(query, callback) {
	pool.query(query, function(err, rows, fields) {
          if (err) throw err;
          callback(err, rows, fields);
        });
};

exports.queryWithData = function(query, data, callback) {
	pool.query(query, [data], function(err, rows, fields) {
          if (err) throw err;
          callback(err, rows, fields);
        });
};