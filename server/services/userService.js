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