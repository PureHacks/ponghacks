var db = require('./database');
var exports = module.exports = {};

exports.addGame = function(game, callback) {
 	game.date = new Date();

	db.insertObject("Game", game, function(err, rows) {
	  callback(err, rows);
	});
};