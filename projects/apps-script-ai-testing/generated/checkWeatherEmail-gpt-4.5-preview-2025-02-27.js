function checkWeatherAndSendEmail() {
  var apiKey = 'YOUR_API_KEY';
  var city = 'YOUR_CITY';
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

  var response = UrlFetchApp.fetch(url);
  var weatherData = JSON.parse(response.getContentText());

  var weatherCondition = weatherData.weather[0].main;

  if (weatherCondition.toLowerCase().includes('rain')) {
    var recipient = 'recipient@example.com';
    var subject = 'Rain Alert!';
    var body = 'It is going to rain today. Remember to carry an umbrella!';

    MailApp.sendEmail(recipient, subject, body);
  }
}