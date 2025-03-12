function checkWeatherAndSendEmail() {
  // Replace with your actual API key and location
  var apiKey = '<YOUR_OPENWEATHERMAP_API_KEY>';
  var city = 'New York';
  var country = 'US';
  
  // OpenWeatherMap API URL
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}&units=metric`;
  
  try {
    // Fetch weather forecast
    var response = UrlFetchApp.fetch(url);
    var weatherData = JSON.parse(response.getContentText());
    
    // Check if rain is forecasted in the next 24 hours
    var willRain = false;
    for (var i = 0; i < weatherData.list.length; i++) {
      if (weatherData.list[i].weather[0].main.toLowerCase().includes('rain')) {
        willRain = true;
        break;
      }
    }
    
    // Send email if rain is expected
    if (willRain) {
      MailApp.sendEmail({
        to: Session.getActiveUser().getEmail(),
        subject: 'Rain Alert',
        body: `Rain is expected in ${city} in the next 24 hours. Don't forget your umbrella!`
      });
    }
  } catch (error) {
    Logger.log('Error checking weather: ' + error.toString());
  }
}

// Optional: Create a time-driven trigger to run this daily
function createWeatherCheckTrigger() {
  ScriptApp.newTrigger('checkWeatherAndSendEmail')
    .timeBased()
    .everyDays(1)
    .atHour(6)  // Run at 6 AM
    .create();
}