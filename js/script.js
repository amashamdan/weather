/* Location lookup using maxmind gelolocation API.
The function below is found in geoip2.js which is loaded in the head of the html */
geoip2.city(onSuccess, onError);

/* If the call to geooip2 is successfull, the following function executes. */
function onSuccess(location){
	/* The lookedup longitude and latitude are atored in their respective variables. */
	var latitude = location.location.latitude;
	var longitude = location.location.longitude;
	/* the getWeather function is called with current location as arguments */ 
	getWeather(latitude, longitude);
}

/* If the call to geoip2 is unsuccessfull, an error message is alerted. */
function onError(error){
	alert("Error retreiving weather inforamtion: " + error);
}

/* The function getWeather requests weather inforamtion using openweather API
and displays the information on the page. */
function getWeather(lat, lng){
	$.ajax({
	url : "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid=3b226624aed979fa47deafd7a85e8a1d",
    /** If the request succeeds, the results JSON is parsed. */
    success : function(parsed_json) {
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
	    var iconUrl = "weather_images/"+icon+".png";

	    /* The current time is stored in time variables, to display time
	    in customized format, the hours, minutes and seconds are stored in their
	    respective variables. */
	    var time = new Date();
	    var hours = time.getHours();
	    var min = time.getMinutes();
	    var seconds = time.getSeconds();

	    /* All weather data are now appended to the weather div */
		$(".weather").append("<p class='location'>Your are cuurently in <strong>" +
			location + "</strong></p>");
		$(".weather").append("<div class='current'><div class='temperature'>" + temp +
			"&deg  </div><div class='image'><img class='-weather-image' src=" 
			+ iconUrl + "></div></div>");
		$(".weather").append("<p class='other'>Condition: " + condition + "</p>");
		$(".weather").append("<p class='other'>Humidity: " + humidity + "%</p>");
		$(".weather").append("<p class='other'>Wind speed: " + wind + " m/s</p>");
		$(".weather").append("<p class='other'>Clouds: " + clouds + "%</p>");

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