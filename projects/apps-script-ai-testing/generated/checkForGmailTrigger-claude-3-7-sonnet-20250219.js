/**
 * Creates a time-based trigger that runs every 10 minutes to check for new emails.
 */
function createEmailCheckTrigger() {
  // Delete any existing triggers with the same function name to avoid duplicates
  deleteTriggers();
  
  // Create a new trigger that runs every 10 minutes
  ScriptApp.newTrigger('checkForNewEmails')
    .timeBased()
    .everyMinutes(10)
    .create();
  
  Logger.log('Trigger created successfully to check for new emails every 10 minutes.');
}

/**
 * Deletes all triggers associated with the checkForNewEmails function.
 */
function deleteTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'checkForNewEmails') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

/**
 * Checks for new unread emails in Gmail.
 * This function will be called by the trigger every 10 minutes.
 */
function checkForNewEmails() {
  // Get unread messages in the inbox
  var threads = GmailApp.getInboxThreads(0, 10);
  var unreadCount = 0;
  
  for (var i = 0; i < threads.length; i++) {
    if (threads[i].isUnread()) {
      unreadCount++;
    }
  }
  
  if (unreadCount > 0) {
    Logger.log('You have ' + unreadCount + ' unread emails in your inbox.');
    
    // Optional: Send notification or perform other actions when new emails are found
    // sendNotification(unreadCount);
  } else {
    Logger.log('No new unread emails found.');
  }
}

/**
 * Optional function to send a notification when new emails are found.
 * Uncomment and customize as needed.
 */
/*
function sendNotification(unreadCount) {
  // Example: Send an email notification
  var recipient = Session.getActiveUser().getEmail();
  var subject = 'New Email Alert';
  var body = 'You have ' + unreadCount + ' unread emails in your inbox.';
  
  GmailApp.sendEmail(recipient, subject, body);
}
*/

/**
 * Run this function to set up the trigger initially.
 */
function setup() {
  createEmailCheckTrigger();
}