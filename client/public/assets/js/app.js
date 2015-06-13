"use strict";

var app = angular.module("pongApp", ["ngRoute", "pongAppControllers", "filters", "tableSort"]);

app.config(["$routeProvider",
	function($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "partials/dashboard.html",
				controller: "dashboardCtrl"
			})
			.when("/user/:id", {
				templateUrl: "partials/profile.html",
				controller: "profileCtrl"
			})
			.when("/dashboard", {
				templateUrl: "partials/dashboard.html",
				controller: "dashboardCtrl"
			})
			.when("/player-stats", {
				templateUrl: "partials/playerStats.html",
				controller: "playerStatsCtrl"
			})
			.when("/game-history", {
				templateUrl: "partials/gameHistory.html",
				controller: "gameHistoryCtrl"
			})
			.when("/input-score", {
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

angular.module("filters", [])
	.filter("shortFullName", function() {
		return function(fullName) {
			if (fullName) {
				var name = fullName.split(" ");
				return name[0] + " " + name[1][0] + ".";
			} else {
				return "";
			}
		};
	})
	.filter("winRate", function() {
		return function(winRate) {
			if (typeof winRate === "number" && !isNaN(winRate)) {
				if (winRate % 1 === 0) {
					return winRate + "%";
				} else {
					return winRate.toFixed(1) + "%";
				}
			} else {
				return 0;
			}
		};
	})
	.filter("realNumber", function() {
		return function(number) {
			if (isNaN(number)) {
				return 0;
			} else {
				return number;
			}
		};
	})
	.filter("smartDate", function() {
		var today = new Date(),
			day = today.getDate(),
			month = today.getMonth();

		return function(date) {
			if (date){
				var dayOfWeek = ["Monday", "Tuesday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
				var date = new Date(date),
					dateDay = date.getDate(),
					dateMonth = date.getMonth(),
					time = date.toLocaleTimeString().split(":");
					time = time[0] + ":" + time[1] + time[2].substr(time[2].length-2, 2).toLowerCase();

				if (day === dateDay && month === dateMonth) {
					return "Today " + time;
				} else if (day - dateDay === 1) {
					return "Yesterday " + time;
				} else if ((day - dateDay < 7 && dateMonth === month) || dateMonth - month === 1 && (day + 30) - dateDay < 7 ) {
					return dayOfWeek[date.getDay()] +" " + time;
				} else if(day - dateDay >= 7 && day - dateDay < 14 || (month - dateMonth === 1) && (day - (dateDay - 30) >= 7  && day - (dateDay - 30) < 14  ) ){
					return "Last Week";
				}
				else {
					return "Awhile ago";
				}
			} else {
				return "";
			}
		};
	});