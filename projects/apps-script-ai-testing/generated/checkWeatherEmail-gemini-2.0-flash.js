function checkWeatherAndSendEmail() {
  // Replace with your OpenWeatherMap API key and email address
  var apiKey = "YOUR_API_KEY";
  var city = "YOUR_CITY"; // e.g., "London"
  var emailAddress = "YOUR_EMAIL_ADDRESS";

  // Construct the API URL
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

  // Fetch the weather data
  try {
    var response = UrlFetchApp.fetch(url);
    var json = JSON.parse(response.getContentText());

    // Check for rain
    if (json.weather && json.weather.length > 0) {
      var weatherDescription = json.weather[0].description.toLowerCase();
      if (weatherDescription.indexOf("rain") > -1) {
        // Send an email
        var subject = "Rain Alert for " + city;
        var body = "It is expected to rain in " + city + ". Description: " + weatherDescription + ". Temperature: " + json.main.temp + "°C";
        MailApp.sendEmail(emailAddress, subject, body);
        Logger.log("Rain alert email sent to " + emailAddress);
      } else {
        Logger.log("No rain expected in " + city + ". Weather: " + weatherDescription);
      }
    } else {
      Logger.log("Weather data not available for " + city);
    }
  } catch (e) {
    Logger.log("Error fetching weather data: " + e);
  }
}

// Optional: Create a time-based trigger to run the function periodically
function createTimeDrivenTrigger() {
  // Trigger every day at 6 AM
  ScriptApp.newTrigger('checkWeatherAndSendEmail')
    .timeBased()
    .atHour(6)
    .everyDays(1)
    .create();
}
