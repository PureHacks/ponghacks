"use strict";

var mysql = require("mysql");
var key = require("../key");
var exports = module.exports = {};

var pool = mysql.createPool({
	connectionLimit : 80,
	host     : "localhost",
	user     : key.db_user,
	password : key.db_password,
	port: key.db_port,
	database: "PongHacks",
	multipleStatements: true
	//,debug: true
});

exports.query = function(query, callback) {
	pool.query(query, function(error, rows, fields) {
		if (error) {
			throw error;
		}
		callback(error, rows, fields);
	});
};

exports.queryByValue = function(query, data, callback) {
	pool.query(query, [data], function(error, rows, fields) {
		if (error) {
			throw error;
		} 
		callback(error, rows, fields);
	});
};

exports.insertObject = function(tableName, obj, callback) {
	pool.query("INSERT INTO " + tableName + " SET ?", obj, function(error, result, fields) {
		if (error) {
			throw error;
		}
		callback(error, result, fields);
	});
};

exports.escape = function(input) {
	return pool.escape(input);
};

exports.getConnection = function(callback) {
	pool.getConnection(function(error, connection) {
	  callback(error, connection);
	});
};