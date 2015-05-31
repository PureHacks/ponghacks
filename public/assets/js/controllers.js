'use strict';

/* Controllers */

var pongAppControllers = angular.module('pongAppControllers', []);

pongAppControllers.controller('leaderboardCtrl', ['$scope', '$http',
	function($scope, $http) {
		
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

			//TODO: build service
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