angular.module("appServices")
	.factory("locSvc", function(){
		function getLocation() {
			var setMapOptions = {
				enableHighAccuracy: true,
				timeout: 5000,
			};

		    if (navigator.geolocation) {
				    	navigator.geolocation.getCurrentPosition(function( position ){
				    		aqui = {
				    			lat : position.coords.latitude,
					    		lng : position.coords.longitude
					    	}
							// map.setCenter(aqui);
							// sv.getPanorama({location: aqui, radius: 50}, processSVData);
				    	}, function(){} , setMapOptions);
					} else {
						aqui = {
				    			lat : 0,
					    		lng : 0
					    	}
					}
			return aqui;
		}
	return {
			getLocation: getLocation
		}
	});
			
