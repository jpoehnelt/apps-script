/**
 * Fetches data from example.com
 * @return {string} The content from example.com
 */
function fetchDataFromExampleCom() {
  try {
    // Make a GET request to example.com
    var response = UrlFetchApp.fetch('https://example.com');
    
    // Get the response content
    var content = response.getContentText();
    
    // Log the content
    Logger.log('Successfully fetched data from example.com');
    
    return content;
  } catch (error) {
    Logger.log('Error fetching data from example.com: ' + error.toString());
    return 'Error: ' + error.toString();
  }
}

/**
 * Example function to process the fetched data
 */
function processExampleData() {
  var data = fetchDataFromExampleCom();
  
  // Do something with the data
  Logger.log('Data length: ' + data.length);
  
  // You can add more processing here
  // For example, parse HTML, extract specific information, etc.
  
  return data;
}