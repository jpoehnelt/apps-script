function createTimeDrivenTrigger() {
  // Delete any existing triggers to avoid duplicates
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    if (trigger.getHandlerFunction() === 'checkForNewEmails') {
      ScriptApp.deleteTrigger(trigger);
    }
  }

  // Create a new time-driven trigger that runs every 10 minutes
  ScriptApp.newTrigger('checkForNewEmails')
    .timeBased()
    .everyMinutes(10)
    .create();
}

function checkForNewEmails() {
  const threads = GmailApp.getInboxThreads();
  const newEmails = threads.filter(thread => thread.isUnread());

  if (newEmails.length > 0) {
    Logger.log('You have new emails!');
    // You can add additional actions here, like sending a notification
  } else {
    Logger.log('No new emails.');
  }
}