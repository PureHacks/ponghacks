"use strict";

var db = require("./database");
var exports = module.exports = {};

exports.addGame = function(game, callback) {
 	game.date = new Date();

	db.insertObject("Game", game, function(error, rows) {
	  callback(error, rows);
	});
};

exports.getGame = function(gameId, callback) {
 	var query = " \
 		SELECT winnerUserId, winner.name as winnerName, winnerScore, winner.avatarUrl as winnerAvatarUrl, loserUserId, \
 			loser.name as loserName, loser.avatarUrl as loserAvatarUrl, loserScore, date  \
		FROM Game \
		INNER JOIN User as winner \
			ON winnerUserId = winner.userId \
		INNER JOIN User as loser \
			ON loserUserId = loser.userId \
		WHERE id = " + db.escape(gameId) + " \
		ORDER BY date DESC LIMIT 1";

	db.query(query, function(error, rows) {
	  callback(error, rows);
	});
};

exports.getUserGames = function(userId, numResults, offset, callback) {
 	var query = " \
 		SELECT winnerUserId, winner.name as winnerName, winnerScore, winner.avatarUrl as winnerAvatarUrl, loserUserId, \
 			loser.name as loserName, loser.avatarUrl as loserAvatarUrl, loserScore, date  \
		FROM Game \
		INNER JOIN User as winner \
			ON winnerUserId = winner.userId \
		INNER JOIN User as loser \
			ON loserUserId = loser.userId \
        WHERE (winnerUserId = " + db.escape(userId) + " OR loserUserId = " + db.escape(userId) + ") \
		ORDER BY date DESC LIMIT " + offset + ", " + numResults;

	db.query(query, function(error, rows) {
	  callback(error, rows);
	});
};

exports.getRecent = function(numGames, callback) {
 	var query = " \
 		SELECT winnerUserId, winner.name as winnerName, winnerScore, winner.avatarUrl as winnerAvatarUrl, loserUserId, \
 			loser.name as loserName, loser.avatarUrl as loserAvatarUrl, loserScore, date  \
		FROM Game \
		INNER JOIN User as winner \
			ON winnerUserId = winner.userId \
		INNER JOIN User as loser \
			ON loserUserId = loser.userId \
		ORDER BY date DESC LIMIT " + numGames;

	db.query(query, function(error, rows) {
	  callback(error, rows);
	});
};

exports.getVersusGames = function(userId, opponentUserId, numResults, offset, callback) {
 	var query = " \
 		SELECT winnerUserId, winner.name as winnerName, winnerScore, winner.avatarUrl as winnerAvatarUrl, loserUserId, \
 			loser.name as loserName, loser.avatarUrl as loserAvatarUrl, loserScore, date  \
		FROM Game \
		INNER JOIN User as winner \
			ON winnerUserId = winner.userId \
		INNER JOIN User as loser \
			ON loserUserId = loser.userId \
        WHERE ((winnerUserId = " + db.escape(userId) + " AND loserUserId = " + db.escape(opponentUserId) + ") \
        	OR (winnerUserId = " + db.escape(opponentUserId) + " AND loserUserId = " + db.escape(userId) + ")) \
		ORDER BY date DESC LIMIT " + offset + ", " + numResults;

	db.query(query, function(error, rows) {
	  callback(error, rows);
	});
}

exports.getTotalNumGames = function(callback) {
	db.query("SELECT COUNT(*) as gameCount FROM Game", function(error, rows) {
	  callback(error, rows);
	});
};