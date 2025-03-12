function addRows() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  sheet.insertRowsAfter(sheet.getLastRow(), 1000);
}