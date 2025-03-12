function checkWeatherAndSendEmail() {
  // Replace with your location's latitude and longitude
  const latitude = 37.7749; // Example: San Francisco
  const longitude = -122.4194;

  // Replace with your OpenWeatherMap API key
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

  // Build the API URL for the 7 day forecast
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  // Fetch the weather data
  const response = UrlFetchApp.fetch(apiUrl);
  const data = JSON.parse(response.getContentText());

  // Check for rain in the forecast
  let rainExpected = false;
  let rainTime = '';
  let rainDescription = '';

  //Iterate through the 3-hour forecasts
  for (let i = 0; i < data.list.length; i++) {
    const forecast = data.list[i];
    const forecastTime = new Date(forecast.dt * 1000); // Convert Unix timestamp to milliseconds

    // Check if the forecast includes rain
    if (forecast.weather && forecast.weather.length > 0) {
      for (let j = 0; j < forecast.weather.length; j++) {
        const weather = forecast.weather[j];
        if (weather.main.toLowerCase().includes('rain')) {
          rainExpected = true;
          rainTime = forecastTime.toLocaleString(); // Format the date and time
          rainDescription = weather.description; // Get a more detailed description
          break; // Exit the inner loop once rain is found
        }
      }
    }
    if (rainExpected) {
      break; // Exit the outer loop once rain is found in any forecast
    }
  }

  // Send an email if rain is expected
  if (rainExpected) {
    const recipient = 'your_email@example.com'; // Replace with your email address
    const subject = 'Rain Expected in the Forecast';
    const body = `Rain is expected at ${rainTime}. Description: ${rainDescription}.`;

    MailApp.sendEmail(recipient, subject, body);
  }
}