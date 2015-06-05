"use strict";

var db = require("./database");
var exports = module.exports = {};

exports.getAppStats = function(callback) {
	db.query("SELECT COUNT(*) as numGames, SUM(winnerScore + loserScore) as totalPoints FROM GAME", function(error, rows) {
	  callback(error, rows);
	});
};

exports.getUserStats = function(userId, callback) {
	var userId = db.escape(userId);
	var opponentUserId = db.escape(opponentUserId);

	var query = "\
	SELECT  ( \
	    SELECT COUNT(*) \
	    FROM   Game \
	    WHERE winnerUserId = " + userId + "  \
	    ) AS wins, \
	     \
	    ( \
	    SELECT COUNT(*) \
	    FROM   Game \
	    WHERE loserUserId =  " + userId + " \
	    ) AS losses, \
 \
	    ( \
	    SELECT SUM(winnerScore) FROM Game \
	      WHERE winnerUserId  =  " + userId + "\
	    ) AS winningPoints, \
 \
	    ( \
	    SELECT SUM(loserScore) FROM Game \
	      WHERE loserUserId  =  " + userId + " \
	    ) AS losingPoints";

	db.query(query, function(error, rows) {
	  callback(error, rows);
	});
};

exports.getUserMatchup = function(userId, opponentUserId, callback) {
	var userId = db.escape(userId);
	var opponentUserId = db.escape(opponentUserId);

	var query = "\
	SELECT  ( \
	    SELECT COUNT(*) \
	    FROM   Game \
	    WHERE winnerUserId = " + userId + " and loserUserId =  " + opponentUserId + "  \
	    ) AS wins, \
	     \
	    ( \
	    SELECT COUNT(*) \
	    FROM   Game \
	    WHERE loserUserId =  " + userId + "  and winnerUserId = " + opponentUserId + " \
	    ) AS opponentWins, \
 \
	    ( \
	    SELECT SUM(winnerScore) FROM Game \
	      WHERE winnerUserId  =  " + userId + "  AND loserUserId = " + opponentUserId + " \
	    ) AS winningPoints, \
 \
	    ( \
	    SELECT SUM(loserScore) FROM Game \
	      WHERE loserUserId  =  " + userId + "  AND winnerUserId = " + opponentUserId + " \
	    ) AS losingPoints, \
 \
	    ( \
	    SELECT SUM(winnerScore) FROM Game \
	      WHERE winnerUserId  = " + opponentUserId + " AND loserUserId =  " + userId + "  \
	    ) AS opponentWinningPoints, \
 \
	    ( \
	    SELECT SUM(loserScore) FROM Game \
	      WHERE loserUserId  = " + opponentUserId + " AND winnerUserId =  " + userId + "  \
	    ) AS opponentLosingPoints \
	";

	db.query(query, function(error, rows) {
	  callback(error, rows);
	});
};