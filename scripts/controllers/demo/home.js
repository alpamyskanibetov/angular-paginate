'use strict';
/*jshint sub:true*/

angular.module('demo')
.controller('DemoHomeCtrl', ['$scope', '$state','$rootScope',
	function($scope, $state, $rootScope) {
		console.log('DemoHomeCtrl');

		$scope.list = [];

		for (var i=0; i<100000; i++) {
			var chr = String.fromCharCode(97 + i%25);

			$scope.list.push({id: i, name: chr});
		}

		$scope.controls = {
			width: 5,
			interval: 10			
		};
	}]);

