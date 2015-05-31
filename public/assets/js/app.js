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
])
.factory('socket', function ($rootScope) {
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
      })
    }
  };
});
;