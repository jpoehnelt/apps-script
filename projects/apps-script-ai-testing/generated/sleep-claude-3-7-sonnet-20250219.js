/**
 * Puts the script to sleep for 10 seconds
 */
function sleepForTenSeconds() {
  // Google Apps Script doesn't have a native sleep function
  // We can use Utilities.sleep() which takes milliseconds as parameter
  Utilities.sleep(10000); // 10 seconds = 10000 milliseconds
  
  Logger.log("Woke up after sleeping for 10 seconds");
}

/**
 * Example usage of the sleep function
 */
function testSleep() {
  Logger.log("Starting sleep test");
  Logger.log("Going to sleep now...");
  
  sleepForTenSeconds();
  
  Logger.log("Sleep completed");
}