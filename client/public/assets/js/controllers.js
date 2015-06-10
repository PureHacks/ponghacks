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
						console.log("stats:",stats);
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
		$scope.displayedStats = {};
		$scope.filter = "allTime";
		$scope.selectedUsers = [];

		var allTimeStats = {};
		var weeklyStats = {};
		var monthlyStats = {};

		$scope.init = function() {
			$http.get("/api/stats/user/all")
				.success(function(stats){
					allTimeStats = stats;
					setWeeklyStats(stats);
					setMonthlyStats(stats);

					$scope.displayedStats = allTimeStats;
				})
				.error(function(data, status, headers, config) {
					console.error(data.error);
				});
		};

		$scope.$watch("filter", function(value) {
			switch (value) {
			    case "allTime":
			        $scope.displayedStats = allTimeStats;
			        break;
			    case "weekly":
			        $scope.displayedStats = weeklyStats;
			        break;
			    case "monthly":
			        $scope.displayedStats = monthlyStats;
			        break;
			}
		 });
 
		var setWeeklyStats = function(allStats) {
			weeklyStats = allStats.map(function(userStats) {
			  	return {
					"userId": userStats.userId,
				    "name": userStats.name,
				    "avatarUrl": userStats.avatarUrl,
				    "wins": userStats.weeklyWins,
				    "losses": userStats.weeklyLosses,
				    "gameCount": userStats.weeklyGameCount,
				    "winRate": userStats.weeklyWinRate,
				    "rank": userStats.rank
				};
			});
		};

		var setMonthlyStats = function(allStats) {
			monthlyStats = allStats.map(function(userStats) {
			  	return {
					"userId": userStats.userId,
				    "name": userStats.name,
				    "avatarUrl": userStats.avatarUrl,
				    "wins": userStats.monthlyWins,
				    "losses": userStats.monthlyLosses,
				    "gameCount": userStats.monthlyGameCount,
				    "winRate": userStats.monthlyWinRate,
				    "rank": userStats.rank
				};
			});
		};
	    
	    $scope.toggleCompareSelection = function toggleCompareSelection(userId) {
	      var idx = $scope.selectedUsers.indexOf(userId);
	      
	      //already checked, uncheck
	      if (idx > -1) {
	        $scope.selectedUsers.splice(idx, 1);
	      }
	      // if second checkbox, compare users
	      else if($scope.selectedUsers.length === 1){
	        console.log("COMPARING USERS: " + $scope.selectedUsers[0] + " vs. " + userId);
	        $scope.selectedUsers = [];
	      }
	      // first user selected
	      else {
			$scope.selectedUsers.push(userId);
	      }

	      console.log($scope.selectedUsers);
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