"use strict";

module.exports = function(io) {

	var router = require("express").Router();
	var gameService = require("../../services/gameService");


	var addGame = function(req, res) {
		gameService.addGame(req.body, function(error, result){
			if (error){
				res.status(500).json({"error": "Error adding game."});
			}
			else {
				gameService.getGame(result.insertId, function(error, results) {
					if (results.length > 0) {
						io.emit("new-game", results[0]);
					}
				});
				res.status(200).json({id: result.insertId});
			}
		});
	};

	var getGame = function(req, res) {
		gameService.getGame(req.params.gameId, function(error, rows) {
			if (error) {
				res.status(500).json({"error": "Error getting game."});
			}
			else if (rows.length === 0) {
		  		res.status(404).json({"error": "Game with id " + req.params.gameId + " not found."});
		  	}
			else {
				res.status(200).json(rows[0]);
			}
		});
	};

	var getUserGames = function(req, res) {
		var numResults = parseInt(req.query.numResults) || 25;
		var offset = parseInt(req.query.offset) || 0;

		gameService.getUserGames(req.params.userId, numResults, offset, function(error, result) {
			if (error){
				res.status(500).json({"error": "Error getting users games."});
			}
			else {
				res.status(200).json(result);
			}
		});
	};

	var getRecent = function(req, res) {
		var numGames = parseInt(req.params.numGames) || 5;

		gameService.getRecent(numGames, function(error, result){
			if (error) {
				res.status(500).json({"error": "Error getting recent games."});
			}
			else {
				res.status(200).json(result);
			}
		});
	};

	var getVersusGames = function(req, res) {
		var numResults = parseInt(req.query.numResults) || 25;
		var offset = parseInt(req.query.offset) || 0;

		gameService.getVersusGames(req.params.userId, req.params.opponentUserId, numResults, offset, function(error, result) {
			if (error){
				res.status(500).json({"error": "Error getting versus games."});
			}
			else {
				res.status(200).json(result);
			}
		});
	};

	var getTotalNumGames = function(req, res) {
		gameService.getTotalNumGames(function(error, rows) {
			if (error || rows.length == 0){
				res.status(500).json({"error": "Error getting game count."});
			}
			else {
				res.status(200).json(rows[0]);
			}
		});
	};


	router.post("/", addGame);
	router.get("/total", getTotalNumGames);
	router.get("/:gameId", getGame);
	router.get("/:userId/versus/:opponentUserId", getVersusGames);
	router.get("/user/:userId", getUserGames);
	router.get("/recent/:numGames", getRecent);

	return router;
};