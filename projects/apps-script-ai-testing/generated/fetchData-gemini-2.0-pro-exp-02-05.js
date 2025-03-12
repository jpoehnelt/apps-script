function fetchDataFromExampleDotCom() {
  var url = 'https://example.com';

  try {
    var response = UrlFetchApp.fetch(url);
    
    // Check the HTTP status code
    var statusCode = response.getResponseCode();
    Logger.log('HTTP Status Code: ' + statusCode);

    if (statusCode == 200) {
      // Get the content as text
      var contentText = response.getContentText();
      Logger.log('Content: ' + contentText);

      // Optionally, parse the content if it's JSON (example)
      // try {
      //   var jsonData = JSON.parse(contentText);
      //   Logger.log('Parsed JSON: ' + JSON.stringify(jsonData, null, 2));
      //   // Process the jsonData as needed
      // } catch (jsonError) {
      //   Logger.log('Error parsing JSON: ' + jsonError);
      // }

      return contentText; // Or return jsonData if you parsed it
    } else {
      Logger.log('Request failed. Status code: ' + statusCode);
      // Handle non-200 status codes appropriately
      return null; // Or throw an error, or return a specific error message
    }
  } catch (e) {
    Logger.log('Error fetching data: ' + e);
    // Handle the error appropriately (e.g., retry, log, notify)
    return null; // Or throw an error
  }
}

// Example usage (optional):
function testFetch() {
  var data = fetchDataFromExampleDotCom();
  if (data) {
    Logger.log('Successfully fetched data.');
    // Further processing of the data
  } else {
    Logger.log('Failed to fetch data.');
  }
}