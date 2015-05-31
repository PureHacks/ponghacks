'use strict';

/* Controllers */

var pongAppControllers = angular.module('pongAppControllers', []);

pongAppControllers.controller('leaderboardCtrl', ['$scope', '$http', 'socket',
	function($scope, $http, socket) {
		var NUM_RECENT_GAMES = 5;

		$scope.recentGameMessages = [];
		
		var getGameMessage = function(game){
			return game.winnerName + " beat " + game.loserName + " " + game.winnerScore + " - " + game.loserScore;
		};

		$http.get('/api/game/recent/' + NUM_RECENT_GAMES).success(function(games) {
			var messages = games.map(function(game){ return getGameMessage(game) });
			$scope.recentGameMessages = messages;
    	});

		socket.on('new-game', function(game){
            $scope.recentGameMessages.unshift(getGameMessage(game));
            if ($scope.recentGameMessages.length > NUM_RECENT_GAMES){
            	$scope.recentGameMessages.pop();
            }
	        //TODO: also refresh leaderboards here
		});
	}
]);

pongAppControllers.controller('inputScoreCtrl', ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {
		
		$http.get('/api/user/list').success(function(data) {
			console.log(data);
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
				headers: { 'Content-type': 'application/json'}
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