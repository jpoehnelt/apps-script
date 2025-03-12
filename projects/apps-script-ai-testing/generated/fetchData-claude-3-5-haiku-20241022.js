function fetchDataFromExampleCom() {
  try {
    // Use UrlFetchApp to make a GET request to example.com
    var response = UrlFetchApp.fetch('https://example.com');
    
    // Get the response text
    var responseText = response.getContentText();
    
    // Log the response (you can modify this to process the data as needed)
    Logger.log(responseText);
    
    // Optional: Return the response text if you want to use it elsewhere
    return responseText;
  } catch (error) {
    // Error handling
    Logger.log('Error fetching data: ' + error.toString());
    return null;
  }
}

// Optional function to demonstrate parsing if it's expected to be JSON
function fetchJsonDataFromExampleCom() {
  try {
    // If example.com provides JSON data
    var response = UrlFetchApp.fetch('https://example.com/api');
    
    // Parse the JSON response
    var jsonData = JSON.parse(response.getContentText());
    
    // Log or process the JSON data
    Logger.log(jsonData);
    
    return jsonData;
  } catch (error) {
    // Error handling
    Logger.log('Error fetching or parsing JSON: ' + error.toString());
    return null;
  }
}