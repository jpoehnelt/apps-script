function addRows() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.insertRowsAfter(sheet.getLastRow(), 1000);
}