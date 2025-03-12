/**
 * Returns the current date as a JavaScript Date object.
 * 
 * @return {Date} The current date
 */
function getCurrentDate() {
  return new Date();
}

/**
 * Example usage of the getCurrentDate function.
 */
function testGetCurrentDate() {
  const currentDate = getCurrentDate();
  Logger.log('Current date: ' + currentDate);
}