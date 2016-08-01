angular.module('appServices', [])
	.factory("mainSvc", function( placesSvc ){
		console.log('mainSvc loaded...');
		function getLocationPlaces( myLoc ){
			return placesSvc.getLocationPlaces( myLoc );
		}

		return  {
			getLocationPlaces: getLocationPlaces,
			radiusSearch: placesSvc.radiusSearch
		}
	})

	.factory('placesSvc', function( $http ){
			console.log("placesSvc loaded...");
			function getLocationPlaces( myLoc ){
				var myCoords = myLoc.lat +','+myLoc.lng;
				var apiKey = 'AIzaSyDqe_No4DSc6W6ATqnLuNoRsDhED5zTFOc';
				apiKey = 'AIzaSyBvnb4nSaQxKSbL1mX61aDZ85g67dM0vVo';
				apiKey = 'AIzaSyB9Q7rRCBRLGmq6KSs7QUGCZjMS_ZBQLhw';
				// var myLoc = "41.3798886,2.1750516";
				var radiusSearch = 2000;
				//var apuUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=YOUR_API_KEY
				var apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=<COORDS>&radius=<RADIUS>&key=<YOUR_API_KEY>'
				apiUrl = apiUrl.replace('<YOUR_API_KEY>',apiKey).replace('<COORDS>',myCoords).replace('<RADIUS>',radiusSearch);
				
				console.log(apiUrl);
				return $http.get( apiUrl );
			}	
			
			//$scope.broadcast('event-name', 'params...') // $emit
			return {
				getLocationPlaces: getLocationPlaces
			}
		})



// https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=<APIKEY>&location=<LOC>&radius=<RADIUS>













// 	https://www.google.es/maps/place/Aeropuerto+de+Barcelona-El+Prat+(BCN)/@41.302449,2.0769551,3a,60y,90t/data=!3m6!1e1!3m4!1sIcPPDsjc0hlsm-YOUNw_5g!2e0!7i13312!8i6656!4m12!1m6!3m5!1s0x12a49e64847c8ea5:0xf32be942fb6f9bd7!2sAeropuerto+de+Barcelona-El+Prat+(BCN)!8m2!3d41.297445!4d2.0832941!3m4!1s0x12a49e64847c8ea5:0xf32be942fb6f9bd7!8m2!3d41.297445!4d2.0832941!6m1!1e1


// 	https://plus.google.com/112715870958058060724/photos/photo/6140927361165848402?pid=6140927361165848402&oid=104524111022384695688


// 	INDOOR
// 	https://maps.googleapis.com/maps/api/streetview?size=600x300&location=41.403609,2.174448&heading=100&pitch=28&scale=2&key=YOUR_API_KEY

// 	OUTDOOR
// 	https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=YOUR_API_KEY


// 	https://maps.googleapis.com/maps/api/streetview?size=600x300&pano=5695851cee37adbcea7305c0473a15906dbcab8f&key=AIzaSyDqe_No4DSc6W6ATqnLuNoRsDhED5zTFOc

// https://www.google.es/maps/place/Aeropuerto+de+Barcelona-El+Prat+(BCN)/@41.302449,2.0769551,3a,62.7y,55.75h,85.6t/data=!3m6!1e1!3m4!1sIcPPDsjc0hlsm-YOUNw_5g!2e0!7i13312!8i6656!4m12!1m6!3m5!1s0x12a49e64847c8ea5:0xf32be942fb6f9bd7!2sAeropuerto+de+Barcelona-El+Prat+(BCN)!8m2!3d41.297445!4d2.0832941!3m4!1s0x12a49e64847c8ea5:0xf32be942fb6f9bd7!8m2!3d41.297445!4d2.0832941!6m1!1e1
// https://www.google.es/maps/place/Aeropuerto+de+Barcelona-El+Prat+(BCN)/@41.302449,2.0769551,3a,62.7y,39.58h,67.25t/data=!3m6!1e1!3m4!1sIcPPDsjc0hlsm-YOUNw_5g!2e0!7i13312!8i6656!4m12!1m6!3m5!1s0x12a49e64847c8ea5:0xf32be942fb6f9bd7!2sAeropuerto+de+Barcelona-El+Prat+(BCN)!8m2!3d41.297445!4d2.0832941!3m4!1s0x12a49e64847c8ea5:0xf32be942fb6f9bd7!8m2!3d41.297445!4d2.0832941!6m1!1e1


// http://cbk0.google.com/cbk?output=xml&ll=41.3798886,2.1750516




// https://www.google.es/maps/place/Piscina+Sant+Jordi/@41.3858201,2.1531813,3a,75y,78.22h,90t/data=!3m8!1e1!3m6!1slXMWNgmAvJ4AAAQvOtMRNg!2e0!3e2!6s%2F%2Fgeo1.ggpht.com%2Fcbk%3Fpanoid%3DlXMWNgmAvJ4AAAQvOtMRNg%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D74.464882%26pitch%3D0!7i13312!8i6656!4m5!3m4!1s0x12a4a28317726117:0x3a7e9c02f610c303!8m2!3d41.3884345!4d2.1468355!6m1!1e1
// https://www.google.es/maps/place/Piscina+Sant+Jordi/@41.3852256,2.1532429,3a,75y,66.25h,90t/data=!3m6!1e1!3m4!1sP_sd02qJ6jEAAAQW_jE5BQ!2e0!7i13312!8i6656!4m5!3m4!1s0x12a4a28317726117:0x3a7e9c02f610c303!8m2!3d41.3884345!4d2.1468355!6m1!1e1
// https://www.google.es/maps/place/Piscina+Sant+Jordi/@41.3856381,2.1534414,3a,75y,56.91h,90t/data=!3m8!1e1!3m6!1sCJ3Q3Sx1xS8AAAQvOtjxsQ!2e0!3e2!6s%2F%2Fgeo3.ggpht.com%2Fcbk%3Fpanoid%3DCJ3Q3Sx1xS8AAAQvOtjxsQ%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D49.021557%26pitch%3D0!7i13312!8i6656!4m5!3m4!1s0x12a4a28317726117:0x3a7e9c02f610c303!8m2!3d41.3884345!4d2.1468355!6m1!1e1

// https://www.google.es/maps/place/Piscina+Sant+Jordi/@41.3860694,2.1533766,3a,75y,26.66h,90t/data=!3m7!1e1!3m5!1stpZFEJ0nIgvUP_chPK7w5w!2e0    !6s%2F%2Fgeo1.ggpht.com%2Fcbk%3Fpanoid%3DtpZFEJ0nIgvUP_chPK7w5w%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D20.64468%26pitch%3D0!7i13312!8i6656!4m5!3m4!1s0x12a4a28317726117:0x3a7e9c02f610c303!8m2!3d41.3884345!4d2.1468355!6m1!1e1





