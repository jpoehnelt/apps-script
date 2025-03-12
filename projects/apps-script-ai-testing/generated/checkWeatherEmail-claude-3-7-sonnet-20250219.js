/**
 * Checks the weather forecast and sends an email if rain is predicted.
 * Uses OpenWeatherMap API to get weather data.
 */
function checkWeatherAndNotify() {
  // Configuration
  const OPENWEATHERMAP_API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  const CITY = 'London'; // Replace with your city
  const RECIPIENT_EMAIL = 'your.email@example.com'; // Replace with your email
  
  try {
    // Get weather data from OpenWeatherMap API
    const weatherData = getWeatherForecast(CITY, OPENWEATHERMAP_API_KEY);
    
    // Check if rain is in the forecast
    if (isRainInForecast(weatherData)) {
      sendRainAlert(RECIPIENT_EMAIL, CITY, weatherData);
      Logger.log('Rain alert email sent successfully.');
    } else {
      Logger.log('No rain in the forecast. No email sent.');
    }
  } catch (error) {
    Logger.log('Error: ' + error.message);
  }
}

/**
 * Gets weather forecast data from OpenWeatherMap API.
 * 
 * @param {string} city - The city to get weather for
 * @param {string} apiKey - OpenWeatherMap API key
 * @return {object} Weather data
 */
function getWeatherForecast(city, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const response = UrlFetchApp.fetch(url);
  return JSON.parse(response.getContentText());
}

/**
 * Checks if rain is predicted in the forecast data.
 * 
 * @param {object} weatherData - Weather forecast data
 * @return {boolean} True if rain is in the forecast
 */
function isRainInForecast(weatherData) {
  // Check the next 24 hours (8 forecast points, as they're typically 3 hours apart)
  const forecastPoints = Math.min(8, weatherData.list.length);
  
  for (let i = 0; i < forecastPoints; i++) {
    const forecast = weatherData.list[i];
    // Check if any weather condition contains rain
    for (let j = 0; j < forecast.weather.length; j++) {
      const condition = forecast.weather[j].main.toLowerCase();
      if (condition.includes('rain') || condition === 'drizzle' || condition === 'thunderstorm') {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Sends an email alert about rain in the forecast.
 * 
 * @param {string} recipient - Email address to send to
 * @param {string} city - City name
 * @param {object} weatherData - Weather forecast data
 */
function sendRainAlert(recipient, city, weatherData) {
  const cityName = weatherData.city.name;
  const country = weatherData.city.country;
  
  // Get the first rain forecast details
  let rainForecast = null;
  for (let i = 0; i < weatherData.list.length; i++) {
    const forecast = weatherData.list[i];
    for (let j = 0; j < forecast.weather.length; j++) {
      const condition = forecast.weather[j].main.toLowerCase();
      if (condition.includes('rain') || condition === 'drizzle' || condition === 'thunderstorm') {
        rainForecast = forecast;
        break;
      }
    }
    if (rainForecast) break;
  }
  
  // Format date and time
  const forecastDate = new Date(rainForecast.dt * 1000);
  const formattedDate = Utilities.formatDate(forecastDate, Session.getScriptTimeZone(), "EEEE, MMMM d, yyyy 'at' h:mm a");
  
  // Create email content
  const subject = `⚠️ Rain Alert for ${cityName}, ${country}`;
  
  let body = `Hello,\n\n`;
  body += `Rain is expected in ${cityName}, ${country} on ${formattedDate}.\n\n`;
  body += `Weather details:\n`;
  body += `- Temperature: ${rainForecast.main.temp}°C\n`;
  body += `- Condition: ${rainForecast.weather[0].description}\n`;
  body += `- Humidity: ${rainForecast.main.humidity}%\n`;
  body += `- Wind: ${rainForecast.wind.speed} m/s\n\n`;
  body += `Don't forget your umbrella! ☔\n\n`;
  body += `This is an automated message from your Weather Alert System.`;
  
  // Send the email
  GmailApp.sendEmail(recipient, subject, body);
}

/**
 * Creates a trigger to run the weather check daily.
 * Run this function once to set up the daily trigger.
 */
function createDailyTrigger() {
  // Delete any existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'checkWeatherAndNotify') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Create a new trigger to run daily at 7:00 AM
  ScriptApp.newTrigger('checkWeatherAndNotify')
    .timeBased()
    .atHour(7)
    .everyDays(1)
    .create();
    
  Logger.log('Daily weather check trigger created successfully.');
}