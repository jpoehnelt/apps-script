function add1000Rows() {
  // Get the active spreadsheet and sheet.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  // Insert 1000 rows after the last row with content.
  sheet.insertRowsAfter(sheet.getLastRow(), 1000);
}