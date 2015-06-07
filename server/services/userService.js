"use strict";

var db = require("./database");
var exports = module.exports = {};

exports.getAllUsers = function(callback) {
	db.query("SELECT * FROM User ORDER BY name", function(error, rows) {
	  callback(error, rows);
	});
};

exports.getUser = function(userId, callback) {
	db.queryByValue("SELECT * FROM User WHERE userId = ?", userId, function(error, rows) {
	  callback(error, rows);
	});
};

exports.getRecentUsers = function(numResults, callback) {
	var query = " \
		SELECT * FROM ( \
			SELECT winnerUserId as userId, MAX(date) as date FROM \
			Game \
			GROUP BY winnerUserId \
			UNION \
			SELECT loserUserId as userId, MAX(date) as date FROM \
			Game \
			GROUP BY loserUserId) as recentWinsLosses \
			INNER JOIN User \
				USING(userId) \
			GROUP BY userId \
			ORDER BY MAX(date) DESC \
			LIMIT " + numResults;

	db.query(query, function(error, rows) {
	  callback(error, rows);
	});
};