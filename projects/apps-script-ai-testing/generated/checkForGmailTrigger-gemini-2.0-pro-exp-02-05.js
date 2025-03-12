function createTrigger() {
  // Trigger the checkEmail function every 10 minutes.
  ScriptApp.newTrigger('checkEmail')
      .timeBased()
      .everyMinutes(10)
      .create();
}

function checkEmail() {
  // Get the number of unread threads in the inbox.
  var unreadCount = GmailApp.getInboxUnreadCount();

  // Log the unread count.
  Logger.log('Unread email count: ' + unreadCount);

  if (unreadCount > 0) {
    // Get the first page of unread threads.
    var threads = GmailApp.getInboxThreads(0, 1); // Fetch only 1 thread for efficiency
    if (threads.length > 0) {
      var firstMessage = threads[0].getMessages()[0];
      var sender = firstMessage.getFrom();
      var subject = firstMessage.getSubject();
      var date = firstMessage.getDate();

      // Log details of the first unread email.
      Logger.log('You have new email(s). First new email details:');
      Logger.log('Sender: ' + sender);
      Logger.log('Subject: ' + subject);
      Logger.log('Date: ' + date);

      // Example: Send a notification (you can customize this part)
      // MailApp.sendEmail({
      //   to: Session.getActiveUser().getEmail(),
      //   subject: 'New Email Notification',
      //   body: 'You have ' + unreadCount + ' unread emails. First new email: Sender: ' + sender + ', Subject: ' + subject
      // });
    }
  }
}


function deleteTrigger(){
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == 'checkEmail') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}
