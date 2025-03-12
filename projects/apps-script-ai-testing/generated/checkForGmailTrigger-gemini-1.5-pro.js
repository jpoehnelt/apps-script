function createTriggerForNewEmail() {
  // Trigger every 10 minutes.
  ScriptApp.newTrigger('checkForNewEmail')
      .timeBased()
      .everyMinutes(10)
      .create();
}

function checkForNewEmail() {
  // Get the current user's email address.
  var emailAddress = Session.getActiveUser().getEmail();

  // Get unread threads.
  var threads = GmailApp.search('is:unread');

  // Log the subject of each unread thread.
  for (var i = 0; i < threads.length; i++) {
    Logger.log(threads[i].getFirstMessageSubject());
  }
}