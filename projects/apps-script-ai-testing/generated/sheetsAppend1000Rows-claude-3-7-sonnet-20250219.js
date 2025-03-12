/**
 * Adds 1000 rows to the active sheet in the current spreadsheet.
 * Each row will contain sequential numbers in the first column.
 */
function addThousandRows() {
  // Get the active spreadsheet and sheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  
  // Create an array to hold all the row data
  var rowsData = [];
  
  // Generate 1000 rows of data
  for (var i = 1; i <= 1000; i++) {
    rowsData.push([i]); // Add a row with just the row number in the first column
  }
  
  // Get the next empty row
  var lastRow = sheet.getLastRow();
  
  // Add all rows at once (more efficient than adding one by one)
  if (rowsData.length > 0) {
    sheet.getRange(lastRow + 1, 1, rowsData.length, 1).setValues(rowsData);
  }
  
  // Log completion message
  Logger.log("Added 1000 rows to the sheet");
}

/**
 * Alternative version that allows customizing the number of rows and adding more data
 * @param {number} rowCount - Number of rows to add (defaults to 1000)
 * @param {boolean} addTimestamp - Whether to add timestamps in column B (defaults to false)
 */
function addCustomRows(rowCount, addTimestamp) {
  // Set default values if parameters are not provided
  rowCount = rowCount || 1000;
  addTimestamp = addTimestamp || false;
  
  // Get the active spreadsheet and sheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  
  // Create an array to hold all the row data
  var rowsData = [];
  
  // Generate rows of data
  for (var i = 1; i <= rowCount; i++) {
    if (addTimestamp) {
      rowsData.push([i, new Date()]); // Add row number and timestamp
    } else {
      rowsData.push([i]); // Add just the row number
    }
  }
  
  // Get the next empty row
  var lastRow = sheet.getLastRow();
  
  // Add all rows at once
  if (rowsData.length > 0) {
    var columns = addTimestamp ? 2 : 1;
    sheet.getRange(lastRow + 1, 1, rowsData.length, columns).setValues(rowsData);
  }
  
  // Log completion message
  Logger.log("Added " + rowCount + " rows to the sheet");
}