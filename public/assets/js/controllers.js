'use strict';

/* Controllers */

var pongAppControllers = angular.module('pongAppControllers', []);

pongAppControllers.controller('leaderboardCtrl', ['$scope', '$http',
	function($scope, $http) {
		
	}
]);

pongAppControllers.controller('inputScoreCtrl', ['$scope', '$routeParams',
	function($scope, $routeParams) {
		//$scope.phoneId = $routeParams.phoneId;

		$scope.team = [{name: "Matt"},{name: "Mike"},{name: "Tim"}];

		$scope.winner = {
			score: 21
		};
		$scope.loser = {};

	}
]);