function createTrigger() {
  ScriptApp.newTrigger("checkNewEmails")
    .timeBased()
    .everyMinutes(10)
    .create();
}

function checkNewEmails() {
  var threads = GmailApp.getInboxThreads(0, 10); // Get the latest 10 threads
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    if (thread.isUnread()) {
      Logger.log("New email found: " + thread.getFirstMessageSubject());
    }
  }
}