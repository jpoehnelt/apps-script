function fetchDataFromExample() {
  var url = "https://example.com";
  var response = UrlFetchApp.fetch(url);
  var data = response.getContentText();
  Logger.log(data);
  return data;
}