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

// /api/game
app.use("/api/game", require("./controllers/api/game"));

// /api/leaderboard
app.use("/api/leaderboard", require("./controllers/api/leaderboard"));

// /api/getUsers
app.use("/api/getUsers", require("./controllers/api/getUsers"));

// /api/user
app.use("/api/user", require("./controllers/api/user"));

app.use("/", require("./controllers/static"));

var server = app.listen(port, function() {
	console.log("listening on localhost:" + port);
});
