function createTrigger() {
  ScriptApp.newTrigger('checkNewEmails')
    .timeBased()
    .everyMinutes(10)
    .create();
}

function checkNewEmails() {
  var threads = GmailApp.getInboxThreads(0, 1);
  var lastChecked = PropertiesService.getScriptProperties().getProperty('lastChecked');
  var lastCheckedTime = lastChecked ? new Date(lastChecked) : new Date(0);

  if (threads.length > 0 && threads[0].getLastMessageDate() > lastCheckedTime) {
    Logger.log('You have new emails!');
  }

  PropertiesService.getScriptProperties().setProperty('lastChecked', new Date().toISOString());
}