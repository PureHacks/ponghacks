/*=======================================================================================================
 | WARNING!!!
 |
 | By defualt, HipChat's API is rate limited to 100 requests per 5 minutes. If there are more than 
 | 100 employees the script will need to be executed multiple times every 5 minutes.  This can be 
 | handled by modifying the 'start-index' and 'max-results' query string params. By default the script
 | inserts/updates the first 99 employees.
 |
 | Note: there is a script 'updateUsers-cron.js' that is designed to be run as a cron job that has 
 | built in rate limiting handling.
 *======================================================================================================*/

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

request("https://hipchat.tor.razorfish.com/v2/user?start-index=0&max-results=99&auth_token=" + key.hc_auth_token_user, function (error, response, body) {
	var users = JSON.parse(body).items;
	var userDetailURLs = users.map(function(user) {
	  	return user.links.self + "?auth_token=" + key.hc_auth_token_user;
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