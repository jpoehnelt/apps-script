function checkWeatherAndSendEmail() {
  var apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeatherMap API key
  var city = "YOUR_CITY_NAME"; // Replace with your city name
  var emailAddress = "RECIPIENT_EMAIL_ADDRESS"; // Replace with the recipient's email address

  // Fetch weather data from OpenWeatherMap API
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  var response = UrlFetchApp.fetch(url);
  var weatherData = JSON.parse(response.getContentText());

  // Check if it is going to rain
  var weatherConditions = weatherData.weather;
  var isRaining = weatherConditions.some(function(condition) {
    return condition.main.toLowerCase().includes("rain");
  });

  // Send an email if it is going to rain
  if (isRaining) {
    var subject = "Weather Alert: Rain Expected";
    var body = "Hello,\n\nIt looks like it is going to rain in " + city + ". Don't forget to carry an umbrella!\n\nBest regards,\nWeather Alert System";
    MailApp.sendEmail(emailAddress, subject, body);
  }
}