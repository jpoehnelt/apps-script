function checkWeatherAndNotify() {
  var apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  var city = 'YOUR_CITY'; // Replace with your city
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric';
  
  var response = UrlFetchApp.fetch(url);
  var weatherData = JSON.parse(response.getContentText());
  var weatherDescription = weatherData.weather[0].description;
  
  if (weatherDescription.includes('rain')) {
    sendEmailNotification(weatherDescription);
  }
}

function sendEmailNotification(weatherDescription) {
  var recipient = 'YOUR_EMAIL@example.com'; // Replace with your email
  var subject = 'Weather Alert: Rain Expected';
  var body = 'The weather forecast indicates that it will rain. Current conditions: ' + weatherDescription;
  
  MailApp.sendEmail(recipient, subject, body);
}