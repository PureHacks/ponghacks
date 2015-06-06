"use strict";

var app = angular.module("pongApp", ["ngRoute", "pongAppControllers", "filters"]);

app.config(["$routeProvider",
	function($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "partials/dashboard.html",
				controller: "dashboardCtrl"
			})
			.when("/dashboard", {
				templateUrl: "partials/dashboard.html",
				controller: "dashboardCtrl"
			})
			.when("/leaderboard", {
				templateUrl: "partials/leaderboard.html",
				controller: "leaderboardCtrl"
			})
			.when("/inputScore", {
				templateUrl: "partials/inputScore.html",
				controller: "inputScoreCtrl"
			})
			.otherwise({
				redirectTo: "/",
			});
	}
])
.factory("socket", function ($rootScope) {
	var socket = io.connect();
	return {
		on: function (eventName, callback) {
			socket.on(eventName, function () {  
				var args = arguments;
				$rootScope.$apply(function () {
					callback.apply(socket, args);
				});
			});
		},
		emit: function (eventName, data, callback) {
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			});
		}
	};
});

angular.module("filters", []).filter("shortFullName", function() {
	return function(fullName) {
		console.log(fullName);
		if (fullName) {
			var name = fullName.split(" ")
			return name[0] + " " + name[1][0] + ".";
		} else {
			return "";
		}
	};
});