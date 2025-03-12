function fetchDataFromExampleCom() {
  // Make a request to example.com
  const response = UrlFetchApp.fetch('https://example.com');

  // Get the content as a string
  const content = response.getContentText();

  // Log the content (you can process it further as needed)
  Logger.log(content);

  // Return the content
  return content;
}