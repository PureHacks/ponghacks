var app = angular.module('pongApp', []);

app.controller('mainCtrl', function ($scope) {
 	$scope.hello = function(){
 		console.log("hello world");
 	};

 	$scope.team = [{name: "Matt"},{name: "Mike"},{name: "Tim"}];

});