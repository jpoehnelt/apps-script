/**
 * Returns a random integer between 1 and 100, inclusive.
 * @return {number} A random integer between 1 and 100.
 */
function getRandomNumber() {
  // Math.random() returns a number between 0 (inclusive) and 1 (exclusive)
  // Multiply by 100 to get a number between 0 and 99.999...
  // Add 1 to shift the range to 1-100.999...
  // Use Math.floor to round down to the nearest integer
  return Math.floor(Math.random() * 100) + 1;
}

// Example usage:
function testRandomNumber() {
  var randomNum = getRandomNumber();
  Logger.log("Random number between 1 and 100: " + randomNum);
}