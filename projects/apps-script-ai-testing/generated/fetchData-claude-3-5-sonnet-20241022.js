function fetchDataFromExample() {
  try {
    // Make a GET request to example.com
    const response = UrlFetchApp.fetch('https://example.com');
    
    // Get the response content
    const content = response.getContentText();
    
    // Get the response code
    const responseCode = response.getResponseCode();
    
    // Log the results
    Logger.log('Response Code: ' + responseCode);
    Logger.log('Content: ' + content);
    
    return content;
    
  } catch(error) {
    Logger.log('Error fetching data: ' + error.toString());
    throw error;
  }
}