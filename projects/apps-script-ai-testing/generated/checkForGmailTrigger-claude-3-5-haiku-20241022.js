function createEmailCheckTrigger() {
  // Delete any existing triggers for this function to prevent duplicates
  var existingTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < existingTriggers.length; i++) {
    if (existingTriggers[i].getHandlerFunction() == 'checkNewEmails') {
      ScriptApp.deleteTrigger(existingTriggers[i]);
    }
  }
  
  // Create a new time-based trigger that runs every 10 minutes
  ScriptApp.newTrigger('checkNewEmails')
    .timeBased()
    .everyMinutes(10)
    .create();
}

function checkNewEmails() {
  // Get the inbox threads that are unread
  var threads = GmailApp.getInboxThreads();
  var unreadThreads = GmailApp.getInboxThreads(0, 10, {
    search: 'is:unread'
  });
  
  // If there are unread emails, process them
  if (unreadThreads.length > 0) {
    for (var i = 0; i < unreadThreads.length; i++) {
      var thread = unreadThreads[i];
      var messages = thread.getMessages();
      
      // Process each message in the thread
      while (messages.hasNext()) {
        var message = messages.next();
        
        // Example: Log details of new emails
        Logger.log('New Email Received:');
        Logger.log('From: ' + message.getFrom());
        Logger.log('Subject: ' + message.getSubject());
        Logger.log('Body: ' + message.getBody().substring(0, 100) + '...'); // First 100 characters
      }
      
      // Optional: Mark thread as read after processing
      // thread.markRead();
    }
  }
}