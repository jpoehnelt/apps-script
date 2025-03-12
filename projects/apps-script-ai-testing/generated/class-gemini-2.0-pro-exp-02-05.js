class SpreadsheetDetails {
  constructor(spreadsheetId, sheetName) {
    this.spreadsheetId = spreadsheetId;
    this.sheetName = sheetName;
    this.spreadsheet = SpreadsheetApp.openById(this.spreadsheetId);
    this.sheet = this.spreadsheet.getSheetByName(this.sheetName);
  }

  getValues(startRow, startColumn, numRows, numColumns) {
    if (!this.sheet) {
      throw new Error("Sheet " + this.sheetName + " not found.");
    }
    return this.sheet.getRange(startRow, startColumn, numRows, numColumns).getValues();
  }

  setValues(startRow, startColumn, numRows, numColumns, values) {
    if (!this.sheet) {
      throw new Error("Sheet " + this.sheetName + " not found.");
    }
    if (!values || values.length !== numRows || values[0].length !== numColumns) {
      throw new Error('Values dimensions do not match specified range.');
    }
    this.sheet.getRange(startRow, startColumn, numRows, numColumns).setValues(values);
  }

  appendRow(row) {
     if (!this.sheet) {
      throw new Error("Sheet " + this.sheetName + " not found.");
    }
    this.sheet.appendRow(row);
  }

  clearRange(startRow, startColumn, numRows, numColumns) {
    if (!this.sheet) {
      throw new Error("Sheet " + this.sheetName + " not found.");
    }
     this.sheet.getRange(startRow, startColumn, numRows, numColumns).clearContent();
  }

  getLastRow(){
    if (!this.sheet) {
      throw new Error("Sheet " + this.sheetName + " not found.");
    }
    return this.sheet.getLastRow();
  }

  getSpreadsheetName(){
    return this.spreadsheet.getName();
  }

  getSheet(){
    return this.sheet;
  }

  getSpreadsheet(){
    return this.spreadsheet;
  }

}


// Example Usage (for testing purposes):
function testSpreadsheetDetails() {
  // Replace with a valid spreadsheet ID and sheet name.
  const spreadsheetId = 'your_spreadsheet_id';  
  const sheetName = 'Sheet1';

  try {
    const ssDetails = new SpreadsheetDetails(spreadsheetId, sheetName);

    // Get values
    const values = ssDetails.getValues(1, 1, 2, 3);
    Logger.log("Values: " + values);

    // Set values
    const newValues = [['A1', 'B1', 'C1'], ['A2', 'B2', 'C2']];
    ssDetails.setValues(3, 1, 2, 3, newValues);

    // Append a row
    ssDetails.appendRow(['D1', 'E1', 'F1']);

    // Get last row
    Logger.log("Last Row: " + ssDetails.getLastRow());

    // Clear a range
    ssDetails.clearRange(5,1,1,3);

    // Get spreadsheet name
    Logger.log("Spreadsheet Name: " + ssDetails.getSpreadsheetName());

  } catch (error) {
    Logger.log("Error: " + error);
  }
}
