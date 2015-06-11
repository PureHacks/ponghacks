"use strict";

/* Controllers */

var pongAppControllers = angular.module("pongAppControllers", []);


pongAppControllers.controller("dashboardCtrl", ["$scope", "$http", "socket",
	function($scope, $http, socket, $routeParams) {
		var NUM_RECENT_GAMES = 5;

		$scope.dataRefresh = function(refresh) {
			if (!refresh) {
				$http.get("/api/game/history/5")
					.success(function(games) {
						$scope.mostRecentGame = games.shift();
						$scope.recentGames = games;
					})
					.error(function(data, status, headers, config) {
						console.error(data.error);
					});
			}
			$http.get("/api/stats/standings/weekly?numResults=4")
				.success(function(standing) {
					$scope.weeklyStandings = standing;
				})
				.error(function(data, status, headers, config) {
					console.error(data.error);
				});
			$http.get("/api/stats/streak/wins/top")
				.success(function(player) {
					$scope.winStreak = player;
				})
				.error(function(data, status, headers, config) {
					console.error(data.error);
				});
			$http.get("/api/stats/streak/losses/top")
				.success(function(player) {
					$scope.losingStreak = player;
				})
				.error(function(data, status, headers, config) {
					console.error(data.error);
				});
			$http.get("/api/stats/largest-score-difference")
				.success(function(score) {
					$scope.sweepingScore = score;
				})
				.error(function(data, status, headers, config) {
					console.error(data.error);
				});
			$http.get("/api/game/total")
				.success(function(total) {
					$scope.totalGames = total;
				})
				.error(function(data, status, headers, config) {
					console.error(data.error);
				});
			$http.get("/api/stats/top-rankings")
				.success(function(rankings) {
					$scope.eloRanking = rankings || $scope.eloRanking;
				})
				.error(function(data, status, headers, config) {
					console.error(data.error);
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

pongAppControllers.controller("profileCtrl", ["$scope", "$http", "$routeParams", 
	function($scope, $http, $routeParams) {
		$scope.user = {};
		$scope.stats = {};
		$scope.gameHistory = {};
		$scope.init = function() {
			if ($routeParams.id) {
				$http.get("/api/game/user/" + $routeParams.id)
					.success(function(gameHistory){
						$scope.gameHistory = gameHistory;
					})
					.error(function(data, status, headers, config) {
						console.error(data.error);
					});

				$http.get("/api/stats/user/" + $routeParams.id)
					.success(function(stats){
						$scope.stats = stats;
					})
					.error(function(data, status, headers, config) {
						console.error(data.error);
					});
			}
		};
	}
]);

pongAppControllers.controller("playerStatsCtrl", ["$scope", "$http", 
	function($scope, $http) {

		$scope.filter = "allTime";
		$scope.allPlayerStats = [];
		var comparedPlayers = [];

		$scope.init = function() {
			$http.get("/api/stats/user/all")
				.success(function(stats){
					populateData(stats);
				})
				.error(function(data, status, headers, config) {
					console.error(data.error);
				});
		};

		var populateData = function(allPlayerStats){
			angular.forEach(allPlayerStats, function(player, index) {
				var newPlayer = {
					name : player.name,
					avatarUrl : player.avatarUrl,
					rank : player.rank,
					id: player.userId,
					selected : false,
					stats : [setAllTimeStats(player), setWeeklyStats(player), setMonthlyStats(player)],
				};
				$scope.allPlayerStats.push(newPlayer);
			});
			changeStats(0);
		};

		// update gameCount, wins, losses, and win rate 
		// to display either 0: allTime, 1: weekly, 2: monthly
		var changeStats = function(statIndex) {
			angular.forEach($scope.allPlayerStats, function(player, index) {
				angular.extend($scope.allPlayerStats[index], player.stats[statIndex]);
			});
		};

		$scope.$watch("filter", function(value) {
			switch (value) {
				case "allTime":
					changeStats(0);
					break;
				case "weekly":
					changeStats(1);
					break;
				case "monthly":
					changeStats(2);
					break;
			}
		 });

		$scope.comparePlayer = function(playerId) {
			console.log("selected", playerId);
			comparedPlayers.push(playerId);
			if (comparedPlayers.length === 2) {
				console.log("CLEAR");
				compare(comparedPlayers[0], comparedPlayers[1]);
				clearSelectedPlayers();
			}
		};

		var compare = function(playerOneId, playerTwoId) {
			$http.get("/api/stats/user/"+playerOneId+"/matchup/"+playerTwoId)
				.success(function(compareStats) {
					console.log(compareStats);
				});
		};

		var clearSelectedPlayers = function() {
			comparedPlayers = [];
			angular.forEach($scope.allPlayerStats, function(player) {
				player.selected = false;
			});
		};

		var setAllTimeStats = function(stats) {
			return {
				"wins": stats.wins,
				"losses": stats.losses,
				"gameCount": stats.gameCount,
				"winRate": stats.winRate,
			};
		};
 
		var setWeeklyStats = function(stats) {
			return {
				"wins": stats.weeklyWins,
				"losses": stats.weeklyLosses,
				"gameCount": stats.weeklyGameCount,
				"winRate": stats.weeklyWinRate,
			};
		};

		var setMonthlyStats = function(stats) {
			return {
				"wins": stats.monthlyWins,
				"losses": stats.monthlyLosses,
				"gameCount": stats.monthlyGameCount,
				"winRate": stats.monthlyWinRate,
			};
		};
	}
]);

pongAppControllers.controller("gameHistoryCtrl", ["$scope", "$http", 
	function($scope, $http) {
		$scope.gameHistory = {};

		$scope.init = function() {
			$http.get("/api/game/history/99")
				.success(function(gameHist) {
					$scope.gameHistory = gameHist;
				})
				.error(function(data, status, headers, config) {
					console.error(data.error);
				});
		};
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