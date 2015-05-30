'use strict';
var app = angular.module('pongApp', ['ngRoute', 'pongAppControllers']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/leaderboard', {
				templateUrl: 'partials/leaderboard.html',
				controller: 'leaderboardCtrl'
			})
			.when('/inputScore', {
				templateUrl: 'partials/inputScore.html',
				controller: 'inputScoreCtrl'
			})
			.otherwise({
				redirectTo: '/',
				templateUrl: 'partials/inputScore.html',
				controller: 'inputScoreCtrl'
			});
	}
]);