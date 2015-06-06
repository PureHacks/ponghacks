"use strict";

var request = require("request");
var async = require("async");

var key = require("../server/key");
var db = require("../server/services/database");

var fetchUserDetails = function(url, callback){
	request(url, function (error, response, body) {
		if (error){
			callback(error);
		} else {
			callback(null, JSON.parse(body)); // First param indicates error, null=> no error
		}
	});
};

request("https://hipchat.tor.razorfish.com/v2/user?max-results=1000&auth_token=" + key.auth_token, function (error, response, body) {
	var users = JSON.parse(body).items;
	var userDetailURLs = users.map(function(user) {
	  	return user.links.self + "?auth_token=" + key.auth_token;
	});
	
	async.map(userDetailURLs, fetchUserDetails, function(error, results){
	  	if (error){
	   		throw new Error("Failed to update users");
	  	} 
		else {
			var userRows = results.map(function(user) {
				var values = [
						user.id,
						user.email,
						user.name,
						user.mention_name,
						user.photo_url,
					];
				return values;
			});
			db.queryByValue("INSERT INTO User (userId, email, name, mentionName, avatarUrl) VALUES ?", userRows, function(err, rows, fields) {
				if (err){
					process.exit(1);
				}
				else {
					process.exit(0);
				}
			});
		}
	});
});