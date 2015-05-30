'use strict';

var express = require('express'),
	bodyParser = require("body-parser"),
	fs = require("fs"),
	multer = require("multer"),
	app = express();

var	port = process.env.PORT || 8888;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/views'));
app.set('views', __dirname  + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// /api/gameResults/inputScore
app.use("/api/gameResults/inputScore", require("./controllers/api/gameResults/inputScore"));

// /api/leaderboard
app.use("/api/leaderboard", require("./controllers/api/leaderboard"));

app.use("/", require("./controllers/static"));

var server = app.listen(port, function() {
	console.log("listening on localhost:" + port);
});
