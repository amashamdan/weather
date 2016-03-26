/* The if statement checks if the browser supports geolocation.
If it does the location is retrieved. If not, an error message is displayed. */
if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(function(position){
		/* The latitude and longitude of the retreived position are stored
		in the variables latitude and longitude. */
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		/* getWeather function is called to get weather information. */
		getWeather(latitude, longitude);
	});
} else {
	alert("Location services are not available in your browser.")
}

/* The function getWeather requests weather inforamtion using openweather API
and displays the information on the page. */
function getWeather(lat, lng){
	$.ajax({
	url : "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid=3b226624aed979fa47deafd7a85e8a1d",
    /** If the request succeeds, the results JSON is parsed. */
    success : function(parsed_json) {
    	console.log(parsed_json);
	    var location = parsed_json.name;
	    var temp = Math.round(parsed_json.main.temp - 273);
	    var humidity = Math.round(parsed_json.main.humidity);
	    var condition = parsed_json.weather[0].description;
	    var clouds = parsed_json.clouds.all;
	    // wind speed in m/s.
	    var wind = parsed_json.wind.speed;
	    /** An icon code is retrieved which specifies the weather conditions. */

	    var icon = parsed_json.weather[0].icon;
	    /** The weather icon is selected based on the icon code retrieved in the previous line. */
	    /*var iconUrl = "weather_images/"+icon+".png";
	    /** The information are pushed to the weatherArray which is used to display
	    weather information on the map using Knockout bindings. */

	    /* The current time is stored in time variables, to display time
	    in customized format, the hours, minutes and seconds are stored in their
	    respective variables. */
	    var time = new Date();
	    var hours = time.getHours();
	    var min = time.getMinutes();
	    var seconds = time.getSeconds();

	    /* All weather data are now appended to the weather div */
		$(".weather").append("<p>Your cuurent location " + location + "</p>");
		$(".weather").append("<p>" + temp + "</p>");
		$(".weather").append("<p>humidity " + humidity + "</p>");
		$(".weather").append("<p>condition " + condition + "</p>");
		$(".weather").append("<p>wind " + wind + "</p>");
		$(".weather").append("<p>clouds " + clouds + "</p>");

		/* The if statement is use to display the time in 12-hours format with
		am or pm displayed. */
		if (hours > 12) {
			hours -= 12;
			$(".weather").append("<p>Last updated " + hours + ":" + min + " PM</p>");
		} else if (hours < 12) {
			$(".weather").append("<p>Last updated " + hours + ":" + min + " AM</p>");
		} else if (hours == 12){
			$(".weather").append("<p>Last updated " + hours + ":" + min + " PM</p>");			
		}

	}
});
}