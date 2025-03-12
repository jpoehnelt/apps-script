// Function to check for new emails
function checkForNewEmails() {
  var label = GmailApp.getUserLabelByName('Auto-Processed');
  if (!label) {
    label = GmailApp.createLabel('Auto-Processed');
  }
  
  var threads = GmailApp.search('is:unread');

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      if (messages[j].isUnread()) {
        Logger.log('New email found: ' + messages[j].getSubject());
        // Add your code here to process the new email
        // For example, you can forward it, save attachments, etc.

        // Mark the email as read and apply a label (optional)
        messages[j].markRead();
        threads[i].addLabel(label);
      }
    }
  }
}

// Function to create a time-based trigger
function createTimeBasedTrigger() {
  // Delete existing trigger to avoid duplicates
  deleteTrigger('checkForNewEmails');

  // Create a trigger to run the checkForNewEmails function every 10 minutes
  ScriptApp.newTrigger('checkForNewEmails')
    .timeBased()
    .everyMinutes(10)
    .create();

  Logger.log('Time-based trigger created to run every 10 minutes.');
}

// Function to delete an existing trigger (helper function)
function deleteTrigger(functionName) {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == functionName) {
      ScriptApp.deleteTrigger(triggers[i]);
      Logger.log('Deleted trigger for function: ' + functionName);
      return;
    }
  }
}

// Function to run when the script is first installed or authorized
function onInstall(e) {
  createTimeBasedTrigger();
}

// Function to run when the spreadsheet is opened
function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Email Checker')
      .addItem('Create Trigger', 'createTimeBasedTrigger')
      .addToUi();
}
