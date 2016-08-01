angular.module('appControllers', ['appServices'])
	// .controller('mainCtrl', function ($scope, mainSvc) {
	// 	console.log("mainCtrl...");
	// 	$scope.getData = function(){
	// 		console.log("Button pushed...");
	// 		mainSvc.getLocationPlaces()
	// 		.then( function ( data ){
	// 			$scope.$broadcast('DataReceived', data ) // $emit
	// 		})
	// 	}
		

	// })


	.controller('mapCtrl', function ( $scope, $window, mainSvc ) {
		console.log("MapCtrl loaded...");
		$window.initGApi = function () {

			// console.log("Map initiated...");
			var fixedLoc = true;

			var aqui = {
				lat : 37.869085,
				lng : -122.254775
			}

			$scope.aqui = aqui;
			var map;
			var panorama;
			var infowindow;

			var sv = new google.maps.StreetViewService();

			panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
			
			// Set up the map.
			map = new google.maps.Map(document.getElementById('map'), {
				center: aqui,
				zoom: 16,
				streetViewControl: false
			});

			// Set the initial Street View camera to the center of the map
			// sv.getPanorama({location: aqui, radius: 50}, processSVData);			

			// Look for a nearby Street View panorama when the map is clicked.
			// getPanoramaByLocation will return the nearest pano when the
			// given radius is 50 meters or less.
			map.addListener('click', function(event) {
				sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
			});

			infowindow = new google.maps.InfoWindow();

			var service = new google.maps.places.PlacesService( map );

			function callback(results, status) {
			    if (status === google.maps.places.PlacesServiceStatus.OK) {
					for (var i = 0; i < results.length; i++) {
		      			createMarker(results[i]);
	    			}
  				}
			}

			function createMarker(place) {
			    var placeLoc = place.geometry.location;
			    var marker = new google.maps.Marker({
			    	map: map,
			    	position: place.geometry.location
			  	});

			  	// google.maps.event.addListener(marker, 'click', function() {
			   //  	infowindow.setContent(place.name);
			   //  	infowindow.open(map, this);
			  	// });

				google.maps.event.addListener(marker, 'click', function() {
					service.getDetails(place, function(result, status) {
					if (status !== google.maps.places.PlacesServiceStatus.OK) {
						console.error(status);
					return;
					}
					infowindow.setContent(result.name);
					infowindow.open(map, marker);
					});
				});
			}
			// locSvc.getLocation()
			// .then(function( data ){
			// 	map.setCenter( data );
			// 	sv.getPanorama({location: data, radius: 50}, processSVData);
			// })

			var setMapOptions = {
				enableHighAccuracy: true,
				timeout: 5000,
			};
			console.log('init geolocation...');
			navigator.geolocation.getCurrentPosition( function( position ){
				console.log('trying geolocation...');
				if ( fixedLoc ){
					aqui.lat = 41.380072; //, 2.175255
					aqui.lng = 2.175255;
	    		} else {
					aqui.lat = position.coords.latitude;
					console.log(position.coords.latitude);
		    		aqui.lng = position.coords.longitude;
	    		}

	    		$scope.aqui = aqui;
				map.setCenter( aqui );
			 	sv.getPanorama({location: aqui, radius: 50}, processSVData);
			 	$scope.$broadcast("mapCentered", aqui)
			}, function(){} , setMapOptions);			

			$scope.map = map;
			$scope.panorama = panorama;
			console.log( map );


			$scope.$on('mapCentered', function( event ){
				console.log("mapCentered...");
				console.log(map.getBounds());
				service.nearbySearch({
					location: aqui, //41.380072, 2.175255
					radius: 2000
					// types: ['store']
				}, callback);
				console.log( service );
			})
		}





		function processSVData(data, status) {
			if (status === google.maps.StreetViewStatus.OK) {
				var marker = new google.maps.Marker({
					position: data.location.latLng,
					map: $scope.map,
					title: data.location.description
				});
			
			panorama = $scope.panorama;

			panorama.setPano(data.location.pano);
			panorama.setPov({
				heading: 270,
				pitch: 0
			});
			panorama.setVisible(true);

			marker.addListener('click', function() {
				var markerPanoID = data.location.pano;
				// Set the Pano to use the passed panoID.
				panorama.setPano(markerPanoID);
				panorama.setPov({
					heading: 270,
					pitch: 0
				});
				panorama.setVisible(true);
			});
			} else {
				console.error('Street View data not found for this location.');
			}
		}


		$scope.$on("mapCentered", function( event, aquiLoc ){
			console.log('map centered...');
			mainSvc.getLocationPlaces( aquiLoc )
			.then( function ( data ){
				// console.log("getLocPlaces...");
				// console.log( data.data.results );
				$scope.$broadcast('DataReceived', data.data.results ) // $emit
			})

		})

		$scope.$on("placesReceived", function( event, param ){
			mainSvc.fillPlaces( $scope.map, param )
			.then( function ( dataa ){
				console.log("gottenPlaces...");
				console.log( dataa );
				// $scope.$broadcast('DataReceived', data ) // $emit
			})

		})


	})







