"use strict";

var db = require("./database");
var Elo = require("arpad");
var exports = module.exports = {};

exports.addGame = function(game, callback) {
    var newGame = {
        "winnerUserId": game.winnerUserId,
        "winnerScore": game.winnerScore,
        "loserUserId": game.loserUserId,
        "loserScore": game.loserScore,
        "date": new Date()
    };

    var eloConfig = {
        default: 32,
        2100: 24,
        2400: 16
    };
    var elo = new Elo(eloConfig, 100);

    var insertId = null;

    db.getConnection(function(error, connection) {
        if (error) {
            connection.release();
            return callback(error);
        }
        connection.beginTransaction(function(error) {
            if (error) {
                connection.release();
                return callback(error);
            }

            //GET CURRENT ELO SCORES AND CALCULATE UPDATED ELO
            var queryGetCurrentElo = "SELECT \
									(SELECT eloRanking FROM User WHERE userId = " + db.escape(game.winnerUserId) + ") as winnerEloRanking, \
									(SELECT eloRanking FROM User WHERE userId = " + db.escape(game.loserUserId) + ") as loserEloRanking";

            connection.query(queryGetCurrentElo, function(error, rows, fields) {
                if (error || rows.length === 0) {
                    connection.rollback(function() {
                        connection.release();
                        return callback(error);
                    });
                }

                var winnerCurrentElo = rows[0].winnerEloRanking;
                var loserCurrentElo = rows[0].loserEloRanking;
                var winnerNewElo = elo.newRatingIfWon(winnerCurrentElo, loserCurrentElo);
                var loserNewElo = elo.newRatingIfLost(loserCurrentElo, winnerCurrentElo);

                // INSERT NEW GAME
                connection.query("INSERT INTO GAME SET ?", newGame, function(error, result, fields) {
                    if (error) {
                        connection.rollback(function() {
                            connection.release();
                            return callback(error);
                        });
                    }
                    insertId = result.insertId;

                    // UPDATE WINNER'S ELO RANKING
                    var queryUpdateWinnerElo = "UPDATE User SET eloRanking = " + connection.escape(winnerNewElo) + " WHERE userId = " + connection.escape(game.winnerUserId);

                    connection.query(queryUpdateWinnerElo, function(error, result, fields) {
                        if (error) {
                            connection.rollback(function() {
                                connection.release();
                                return callback(error);
                            });
                        }
                        // UPDATE LOSERS'S ELO RANKING
                        var queryUpdateLoserElo = "UPDATE User SET eloRanking = " + connection.escape(loserNewElo) + " WHERE userId = " + connection.escape(game.loserUserId);

                        connection.query(queryUpdateLoserElo, function(error, result, fields) {
                            if (error) {
                                connection.rollback(function() {
                                    connection.release();
                                    return callback(error);
                                });
                            } else {
                                connection.commit(function(error) {
                                    if (error) {
                                        connection.rollback(function() {
                                            connection.release();
                                            return callback(error);
                                        });
                                    } else {
                                        callback(null, insertId);
                                    }
                                });
                            }
                        });
                    });
                });
            });
        });
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
};

exports.getTotalNumGames = function(callback) {
    db.query("SELECT COUNT(*) as gameCount FROM Game", function(error, rows) {
        callback(error, rows);
    });
};