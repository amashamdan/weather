/* Location lookup using ipinfo api */
$.getJSON('http://ipinfo.io', function(data){
	/* The location is stored in the variable location. */
	var location = data.loc;
	/* latitude and longitude are stored in location as a single string seperated
	by a comma. The split function is called on location to seperate latitude and
	longitude. */
	location = location.split(",");
	/* The longitude and latitude are stored in their respective variables. */
	var latitude = location[0];
	var longitude = location[1];
	/* The getWeather function is called with latitude and longitude as arguments. */
	getWeather(latitude, longitude);
})

/* The function getWeather requests weather inforamtion using openweather API
and displays the information on the page. */
function getWeather(lat, lng){
	var temp;
	var iconUrl;
	$.ajax({
	url : "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid=3b226624aed979fa47deafd7a85e8a1d",
    /** If the request succeeds, the results JSON is parsed. */
    success : function(parsed_json) {
	    var location = parsed_json.name;
	    temp = Math.round(parsed_json.main.temp - 273);
	    var humidity = Math.round(parsed_json.main.humidity);
	    var condition = parsed_json.weather[0].description;
	    var clouds = parsed_json.clouds.all;
	    // wind speed in m/s.
	    var wind = parsed_json.wind.speed;
	    /** An icon code is retrieved which specifies the weather conditions. */

	    var icon = parsed_json.weather[0].icon;
	    /** The weather icon is selected based on the icon code retrieved in the previous line. */
	    iconUrl = "weather_images/"+icon+".png";

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
			"&degC  </div><div class='image'><img class='-weather-image' src=" 
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
		/* The loading data message is hidden upon fully loading the page */
		$(".loading").css("display", "none");
	}
	});

	var unit = "c";

	/* A function to change the unit from celcius to fahrenheit and vice versa
	when the "Change Unit" is clicked. */
	$(".unit-button").click(function(){
		/* The if statement checks for the current unit and changed it accordingly,
		then the html is modified to display the new temperature. */
		if (unit == "c"){
			var tempF = Math.floor(temp * 9 / 5 +32);
			unit = "f";
			$(".current").html("<div class='temperature'>" + tempF +
				"&degF  </div><div class='image'><img class='-weather-image' src=" 
				+ iconUrl + "></div>");
		} else if (unit == "f"){
			unit = "c";
			$(".current").html("<div class='temperature'>" + temp +
				"&degC  </div><div class='image'><img class='-weather-image' src=" 
				+ iconUrl + "></div>");
		}
	});
}
