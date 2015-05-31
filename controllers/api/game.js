var router = require("express").Router();
var gameService = require('../../services/gameService');


var addGame = function(req, res) {
	gameService.addGame(req.body, function(error, result){
		if (error){
			res.status(500).json({"error": "Error adding game."});
		}
		else {
			res.status(200).json({id: result.insertId});
		}
	});
};


router.post("/", addGame);

module.exports = router;