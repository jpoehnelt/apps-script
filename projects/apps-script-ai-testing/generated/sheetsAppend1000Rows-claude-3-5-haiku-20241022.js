function addRowsToSheet() {
  // Get the active spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get the active sheet
  var sheet = spreadsheet.getActiveSheet();
  
  // Determine the last row with data to append after
  var lastRow = sheet.getLastRow();
  
  // Create an array to hold 1000 rows of data
  var rowsToAdd = [];
  
  // Populate the rows (in this example, with sequential numbers)
  for (var i = 0; i < 1000; i++) {
    // Create a row with some sample data
    rowsToAdd.push([
      lastRow + i + 1,  // Row number
      "Data " + (lastRow + i + 1),  // Some sample text
      Math.random() * 100  // Random number
    ]);
  }
  
  // Add the rows to the sheet
  sheet.getRange(lastRow + 1, 1, rowsToAdd.length, rowsToAdd[0].length).setValues(rowsToAdd);
}