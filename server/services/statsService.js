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


exports.getWeeklyStandings = function(numResults, callback) {
	var query = " \
 		SELECT winner.userId, winner.name, winCount, loseCount, winCount/(winCount + loseCount) * 100 as winRate FROM \
		( \
			SELECT name, userId, COUNT(*) winCount \
			FROM Game \
			INNER JOIN User \
				ON winnerUserId = userId \
			WHERE YEARWEEK(date) = YEARWEEK(NOW()) \
			GROUP BY winnerUserId \
		) as winner \
		\
		INNER JOIN \
		( \
			SELECT name, userId, COUNT(*) loseCount \
			FROM Game \
			INNER JOIN User \
				ON loserUserId = userId \
			WHERE YEARWEEK(date) = YEARWEEK(NOW()) \
			GROUP BY loserUserId \
		) as loser \
		USING(userId) \
		ORDER BY winRate DESC \
		\
		LIMIT " + db.escape(numResults);

	db.query(query, function(error, rows) {
	  callback(error, rows);
	});
};

exports.getLongestWinStreak = function(callback) {
	var query = " \
 		SELECT userId, name, streak FROM  \
		( \
			SELECT winnerUserId as userId, COUNT(*) as streak \
			FROM Game as a \
			WHERE date > (SELECT MAX(date) \
					      FROM GAME \
						  WHERE loserUserId = a.winnerUserId \
					      ) \
			GROUP BY winnerUserId \
			ORDER BY streak DESC \
			LIMIT 1 \
		) as streaks \
		INNER JOIN USER \
		USING(userId)";

	db.query(query, function(error, rows) {
	  callback(error, rows);
	});
};

exports.getLongestLosingStreak = function(callback) {
	var query = " \
 		SELECT userId, name, streak FROM  \
		( \
			SELECT loserUserId as userId, COUNT(*) as streak \
			FROM Game as a \
			WHERE date > (SELECT MAX(date) \
					      FROM GAME \
						  WHERE winnerUserId = a.loserUserId \
					      ) \
			GROUP BY loserUserId \
			ORDER BY streak DESC \
			LIMIT 1 \
		) as streaks \
		INNER JOIN USER \
		USING(userId)";

	db.query(query, function(error, rows) {
	  callback(error, rows);
	});
};