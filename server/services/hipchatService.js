"use strict";

var key = require("../key");
var request = require("request");
var db = require("./database");


exports.gameUpdate = function(winnerUserId, loserUserId, winnerScore, loserScore) {

	// GET MENTION NAMES FOR USERS
	var getMentionNames = "SELECT \
							(SELECT mentionName FROM User WHERE userId = " + db.escape(winnerUserId) + ") as winnerMention, \
							(SELECT mentionName FROM User WHERE userId = " + db.escape(loserUserId) + ") as loserMention";

    db.query(getMentionNames, function(error, rows, fields) {
        var winnerMention = "@" + rows[0].winnerMention;
        var loserMention = "@" + rows[0].loserMention;

		var options = {
		  uri: "https://hipchat.tor.razorfish.com/v2/room/148/notification?auth_token=" + key.hc_auth_token_room,
		  method: "POST",
		  json: {
			    "message": winnerMention + " beat " + loserMention + " " + winnerScore + " - " + loserScore + " (pingpong)",
			    "color": "green",
			    "message_format": "text"
			}
		};

		// IGNORE ANY ERRORS, IT'S OK IF HIPCHAT UPDATE FAILS

		request(options, function(err, res, body) {});
	});
};