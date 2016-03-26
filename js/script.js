/* The if statement checks if the browser supports geolocation.
If it does the location is retrieved. If not, an error message is displayed. */
if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(function(position){
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var d = new Date();
	});
} else {
	alert("Location services are not available in your browser.")
}

