function fetchDataFromExample() {
  try {
    // Fetch the data from example.com
    var response = UrlFetchApp.fetch('http://example.com');

    // Get the HTTP response code
    var responseCode = response.getResponseCode();

    // Check if the request was successful (200 OK)
    if (responseCode == 200) {
      // Get the content as a string
      var content = response.getContentText();

      // Log the content (you can modify this to process the data as needed)
      Logger.log(content);

      // Return the content (optional, depending on your use case)
      return content;
    } else {
      // Log an error message if the request failed
      Logger.log('Request failed with status code: ' + responseCode);
      return null; // Or throw an error, depending on your needs
    }
  } catch (e) {
    // Handle any errors that occur during the process
    Logger.log('An error occurred: ' + e.toString());
    return null; // Or throw an error
  }
}
