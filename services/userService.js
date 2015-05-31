var database = require('./database');
var exports = module.exports = {};

exports.getAllUsers = function(callback) {
	database.query("SELECT * FROM User", function(err, rows) {
	  callback(err, rows);
	});
};

exports.getUser = function(userId, callback) {
	database.queryWithData("SELECT * FROM User WHERE userId = ?", userId, function(err, rows) {
	  if (rows.length == 0 || err){
	  	callback(err, {"error": "User with id " + userId + " not found."});
	  }
	  else {
	  	callback(err, rows[0]);	
	  }
	});
};