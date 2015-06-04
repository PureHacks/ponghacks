var db = require('./database');
var exports = module.exports = {};

exports.getAllUsers = function(callback) {
	db.query("SELECT * FROM User ORDER BY name", function(err, rows) {
	  callback(err, rows);
	});
};

exports.getUser = function(userId, callback) {
	db.queryByValue("SELECT * FROM User WHERE userId = ?", userId, function(err, rows) {
	  callback(err, rows);
	});
};