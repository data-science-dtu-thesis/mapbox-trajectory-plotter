/*

JS Requirements:
<script src='https://api.mapbox.com/mapbox.js/v2.2.4/mapbox.js'></script>

CSS Requirements:
<link href='https://api.mapbox.com/mapbox.js/v2.2.4/mapbox.css' rel='stylesheet' />

*/


/* A data point */

var Point = (function(latitude, longitude) {

	return {
    	latitude: latitude,
    	longitude: longitude
	}
});

var Trajectory = (function(points) {

	if(points != null){
		var points = points;
	} else {
		var points = [];
	}

	var polyline = L.polyline([]);
	var currentIndex = 0;

	var plotPoint = function() {
		var lat_lon = L.latLng(points[currentIndex].latitude, points[currentIndex].longitude);
		polyline.addLatLng(lat_lon);
		currentIndex++;
	};

	var hasPoints = function() {
		return (points.length != currentIndex + 1);
	}

	return {
		plotPoint: plotPoint,
		hasPoints: hasPoints,
		polyline: polyline
	}


});

var TrajectoryModule = (function(token, data) {
	L.mapbox.accessToken = token;
	var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([0, 0], 3);
    
    var trajectory = Trajectory(data);
    console.log(trajectory);
    // Add a new line to the map with no points.
    trajectory.polyline.addTo(map);

    var plotRecursively = function() {
    	trajectory.plotPoint();
    	window.setTimeout(plotRecursively, 100);
    };

  	plotRecursively();
    
});

