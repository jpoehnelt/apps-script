function addThousandRows() {
  // Get the active spreadsheet and sheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  
  // Create an array to hold 1000 rows of data
  var data = [];
  for (var i = 0; i < 1000; i++) {
    // Each row will be an array with a single value showing the row number
    data.push([`Row ${i + 1}`]);
  }
  
  // Get the last row of the sheet
  var lastRow = sheet.getLastRow();
  
  // Get the range for the new rows
  var range = sheet.getRange(lastRow + 1, 1, 1000, 1);
  
  // Set the values all at once (more efficient than row by row)
  range.setValues(data);
  
  // Optional: Flush to ensure all changes are written
  SpreadsheetApp.flush();
}