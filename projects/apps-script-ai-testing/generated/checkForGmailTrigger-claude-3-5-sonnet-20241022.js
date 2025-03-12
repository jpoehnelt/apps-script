// Function to create a time-based trigger that runs every 10 minutes
function createGmailCheckTrigger() {
  // Delete any existing triggers with the same function name to avoid duplicates
  deleteTriggers();
  
  // Create a time-driven trigger that runs every 10 minutes
  ScriptApp.newTrigger('checkNewEmails')
    .timeBased()
    .everyMinutes(10)
    .create();
}

// Function to delete existing triggers
function deleteTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'checkNewEmails') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

// Function that checks for new emails
function checkNewEmails() {
  // Get threads from the last 10 minutes
  var now = new Date();
  var tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
  
  // Search for unread emails received in the last 10 minutes
  var threads = GmailApp.search('is:unread after:' + tenMinutesAgo.toISOString());
  
  if (threads.length > 0) {
    // Log the number of new emails found
    Logger.log('Found ' + threads.length + ' new unread email(s)');
    
    // Optional: You can add more actions here, such as:
    // - Sending notifications
    // - Processing the emails
    // - Marking them with labels
    // - etc.
    
    for (var i = 0; i < threads.length; i++) {
      var messages = threads[i].getMessages();
      for (var j = 0; j < messages.length; j++) {
        var message = messages[j];
        Logger.log('From: ' + message.getFrom());
        Logger.log('Subject: ' + message.getSubject());
      }
    }
  } else {
    Logger.log('No new unread emails found');
  }
}

// Run this function once to set up the trigger
function initialize() {
  createGmailCheckTrigger();
}