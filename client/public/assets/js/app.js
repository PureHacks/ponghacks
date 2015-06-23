"use strict";

var app = angular.module("pongApp", ["ngRoute", "pongAppControllers", "filters", "tableSort"]);

app.config(["$routeProvider", "$locationProvider",
	function($routeProvider, $locationProvider) {
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
			.when("/tv", {
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
		$locationProvider.html5Mode(true);
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

app.controller("navController", function($scope, $location) {
	$scope.navPath = "partials/nav.html";

	$scope.init = function(){
		$scope.navPath = ($location.path() === "/tv") ? "partials/tvNav.html" : "partials/nav.html";
	};

	$scope.isActive = function(route) {
		return route === $location.path();
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
				return parseFloat(number).toFixed(1);
			}
		};
	})
	.filter("ogDate", function() {
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return function(date) {
			if (date){
				var date = new Date(date);
				var day = date.getDate();
				if (day === 1 || day === 21 || day === 31) {
					day =  day + "st";
				} else if (day === 2 || day === 22){
					day =  day + "nd";
				} else if (day === 3 || day === 23){
					day =  day + "rd";
				} else {
					day =  day + "th";
				}
				var output = months[date.getMonth()] + " " + day + ", " + date.getUTCFullYear();
				return output;
			} else {
				return "";
			}
		};
	})
	.filter("smartDate", function() {
		var today = new Date(),
			day = today.getDate(),
			month = today.getMonth();

		return function(date) {
			if (date){
				var dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
				var date = new Date(date),
					dateDay = date.getDate(),
					dateMonth = date.getMonth(),
					hours = date.getHours(),
					minutes = date.getMinutes(),
					meridian = "am";

				if(hours >= 12) {
					hours = (hours - 12);
					meridian = "pm";
				}
				if(hours === 0) {
					hours = 12;
				}
				minutes = minutes < 10 ? "0" + minutes : minutes;
				var time = hours + ":" + minutes + meridian;

				if (day === dateDay && month === dateMonth) {
					return "Today at " + time;
				} else if (day - dateDay === 1) {
					return "Yesterday at " + time;
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