// Replace with your OpenWeatherMap API key
const API_KEY = 'YOUR_API_KEY';
// Replace with your location coordinates
const LATITUDE = '37.7749'; // Example: San Francisco
const LONGITUDE = '-122.4194';
const RECIPIENT_EMAIL = 'your.email@example.com';

function checkWeatherAndNotify() {
  // Construct the API URL
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;
  
  try {
    // Make API request
    const response = UrlFetchApp.fetch(url);
    const weatherData = JSON.parse(response.getContentText());
    
    // Check if rain is forecasted in the next 24 hours
    const next24Hours = weatherData.list.slice(0, 8); // API returns data in 3-hour intervals
    const willRain = next24Hours.some(interval => {
      return interval.weather.some(w => 
        w.main.toLowerCase().includes('rain') || 
        w.description.toLowerCase().includes('rain')
      );
    });
    
    if (willRain) {
      // Prepare email content
      const subject = '⛈️ Rain Alert!';
      const body = 'Heads up! Rain is forecasted in the next 24 hours. Don\'t forget your umbrella! ☔';
      
      // Send email
      MailApp.sendEmail({
        to: RECIPIENT_EMAIL,
        subject: subject,
        body: body
      });
      
      Logger.log('Rain alert email sent successfully');
    } else {
      Logger.log('No rain forecasted for the next 24 hours');
    }
    
  } catch (error) {
    Logger.log('Error occurred: ' + error.toString());
    // Optionally send error notification
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: 'Weather Check Script Error',
      body: 'An error occurred while checking the weather: ' + error.toString()
    });
  }
}

// Create a daily trigger to run the script
function createDailyTrigger() {
  // Delete any existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create a new trigger to run daily
  ScriptApp.newTrigger('checkWeatherAndNotify')
    .timeBased()
    .everyDays(1)
    .atHour(7) // Run at 7 AM
    .create();
}