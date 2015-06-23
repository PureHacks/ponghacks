"use strict";

var request = require("request");
var async = require("async");

var key = require("../server/key");
var db = require("../server/services/database");

request("https://hipchat.tor.razorfish.com/v2/user?max-results=1000&auth_token=" + key.hc_auth_token_user, function (error, response, body) {
	var users = JSON.parse(body).items;

	// call HipChat API once every 3.5 seconds as there is a limit to 100 requests per 5 minutes
	(function updateUser (i) {          
		setTimeout(function () {   
			request(users[i - 1].links.self + "?auth_token=" + key.hc_auth_token_user, function (error, response, body) {
				var user = JSON.parse(body);
				var values = [user.id, user.email, user.name, user.mention_name, user.photo_url];

				db.queryByValue("INSERT INTO User (userId, email, name, mentionName, avatarUrl) VALUES (?) ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email), mentionName=VALUES(mentionName), avatarUrl=VALUES(avatarUrl)", values, function(err, rows, fields) {
					if (err){
						process.exit(1);
					}
				});
			});

	      if (--i) {
	      	updateUser(i);
	      }
	      else {
	      	process.exit(0);
	      }

	  }, 3500)
	})(users.length);      
});