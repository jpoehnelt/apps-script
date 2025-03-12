function addRowsToSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.insertRowsAfter(sheet.getLastRow(), 1000);
}