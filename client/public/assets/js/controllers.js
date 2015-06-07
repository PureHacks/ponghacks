"use strict";

/* Controllers */

var pongAppControllers = angular.module("pongAppControllers", []);


pongAppControllers.controller("dashboardCtrl", ["$scope", "$http", "socket",
	function($scope, $http, socket, $routeParams) {
		var NUM_RECENT_GAMES = 5;

		$scope.dataRefresh = function(refresh){
			if (!refresh) {
				$http.get("/api/game/recent/5").success(function(games) {
					$scope.mostRecentGame = games.shift();
					$scope.recentGames = games;
	    		});
			}
    		$http.get("/api/stats/standings/weekly?numResults=4").success(function(standing) {
				$scope.weeklyStandings = standing;
    		});
    		$http.get("/api/stats/streak/wins/top").success(function(player) {
				$scope.winStreak = player;
    		});
    		$http.get("/api/stats/streak/losses/top").success(function(player) {
				$scope.losingStreak = player;
    		});
    		$http.get("/api/stats/largest-score-difference").success(function(score) {
    			$scope.sweepingScore = score;
    		});
    		$http.get("/api/game/total").success(function(total) {
    			$scope.totalGames = total;
    		});
    		$http.get("/api/stats/top-rankings").success(function(rankings) {
    			console.log(rankings);
    			$scope.eloRanking = rankings || $scope.eloRanking;
    		});
		};
		
		$scope.mostRecentGame = {};
		$scope.recentGames = [{},{},{},{}];
		$scope.eloRanking = [{},{},{},{},{}];
		$scope.weeklyStandings = [{},{},{},{}];
		$scope.winStreak = {};
		$scope.losingStreak = {};
		$scope.sweepingScore = {};
		$scope.totalGames = 0;

		socket.on("new-game", function(game) {
			$scope.recentGames.unshift($scope.mostRecentGame);
			$scope.mostRecentGame = game;
			if ($scope.recentGames.length > NUM_RECENT_GAMES - 1){
				$scope.recentGames.pop();
			}
			$scope.dataRefresh(true);
		});
	}
]);



pongAppControllers.controller("leaderboardCtrl", ["$scope", "$http", "socket",
	function($scope, $http, socket) {
		var NUM_RECENT_GAMES = 5;

		$scope.recentGameMessages = [];
		
		var getGameMessage = function(game){
			return game.winnerName + " beat " + game.loserName + " " + game.winnerScore + " - " + game.loserScore;
		};

		$http.get("/api/game/recent/" + NUM_RECENT_GAMES).success(function(games) {
			var messages = games.map(function(game){
				console.log(game);
				return getGameMessage(game);
			});
			$scope.recentGameMessages = messages;
		});

		socket.on("new-game", function(game) {
			$scope.recentGameMessages.unshift(getGameMessage(game));
			if ($scope.recentGameMessages.length > NUM_RECENT_GAMES){
				$scope.recentGameMessages.pop();
			}
			//TODO: also refresh leaderboards here
		});
	}
]);

pongAppControllers.controller("inputScoreCtrl", ["$scope", "$http", "$routeParams",
	function($scope, $http, $routeParams) {
		
		$http.get("/api/user/list").success(function(data) {
			$scope.team = data;
    	});

		$scope.submitScore = function() {
			var game = {
				winnerUserId: $scope.winner.userId,
				winnerScore: $scope.winner.score,
				loserUserId: $scope.loser.userId,
				loserScore: $scope.loser.score,
			};

			$http({
				method: "POST",
				url:"/api/game",
				data: game,
				headers: { "Content-type": "application/json"}
			})
			.success(function(data, status, headers, config) {
				$scope.winner = {},
				$scope.loser = {};
			})
			.error(function(data, status, headers, config) {
				console.error(data.error);
			});
		};
	}
]);