angular.module('myAppConfig', [])
	.config(function( $routeProvider ){
		$routeProvider
			.when('/', {
				template: '<p>This is the {{ section }}</p>',
				controller: "HomeViewController"
			})
			.when('/about', {
				template: '<p>This is the {{ section }}</p>',
				controller: "AboutViewController"
			})
			.when('/help', {
				template: '/html/help.html',
				controller: "... ViewController"
			})
			.when('/prod:ID', {
				template: '/html/help.html',
				controller: "ProductViewController"
			})
			.otherwise({redirectTo: '/'});
	})