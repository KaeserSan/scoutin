angular.module('myAppRoute', [])
	.controller("HomeViewController", function( $scope ){
		$scope.section = "Home Page";
	})
	.controller("AboutViewController", function( $scope ){
		$scope.section = "About Page";
	})
	.controller("ProductViewController", function( $scope, $routeParams ){
		$scope.productID = $routeParams.ID
		$scope.section = "About Page";
	})