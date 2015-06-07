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
 		SELECT userId, name, wins, losses, wins + losses as gameCount, wins/(wins + losses) * 100 as winRate FROM \
		( \
			SELECT name, userId, \
				(SELECT COUNT(*) FROM Game WHERE userId = winnerUserId AND YEARWEEK(date) = YEARWEEK(NOW())) as wins, \
				(SELECT COUNT(*) FROM Game WHERE userId = loserUserId AND YEARWEEK(date) = YEARWEEK(NOW())) as losses  \
			FROM USER  \
			GROUP BY userId \
		) as standings WHERE (wins != 0 OR losses != 0) \
		ORDER BY winRate DESC \
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
			WHERE date > (SELECT IFNULL(MAX(date), 0) \
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
			WHERE date > (SELECT IFNULL(MAX(date), 0) \
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

exports.getLargestScoreDifference = function(callback) {
	var query = " \
 		SELECT winnerUserId, winnerUser.name as winnerName, winnerScore, loserUserId, loserUser.name as loserName, loserScore \
		FROM GAME \
		INNER JOIN User winnerUser \
			ON winnerUserId = winnerUser.userId \
		INNER JOIN User loserUser \
			ON loserUserId = loserUser.userId \
		ORDER BY winnerScore - loserScore DESC \
		LIMIT 1";

	db.query(query, function(error, rows) {
	  callback(error, rows);
	});
};

exports.getTopRankings = function(numResults, callback) {
	var query = " \
 		SELECT userId, name \
		FROM User \
		ORDER BY eloRanking DESC \
		LIMIT " + numResults;

	db.query(query, function(error, rows) {
	  callback(error, rows);
	});
};