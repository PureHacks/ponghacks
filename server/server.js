"use strict";

var express = require("express"),
	expressValidator = require("express-validator"),
	bodyParser = require("body-parser"),
	fs = require("fs"),
	multer = require("multer"),
	app = express();

require("colors");

var http = require("http").Server(app);
var io = require("socket.io")(http);

var	port = process.env.PORT || 8888;

app.use(bodyParser.json()); // for parsing application/json
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + "/../client/public"));
app.use(express.static(__dirname + "/../client/public/views"));
app.set("views", __dirname  + "/../client/public/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

/* /api/game */
app.use("/api/game", require("./controllers/api/game")(io));

/* /api/user */
app.use("/api/user", require("./controllers/api/user"));

/* /api/stats */
app.use("/api/stats", require("./controllers/api/stats"));

app.use("/", require("./controllers/static"));

http.listen(port, function(){
	var msg = "Ping Ponging on Port:" + port;
  	console.log(msg.bgRed);
});