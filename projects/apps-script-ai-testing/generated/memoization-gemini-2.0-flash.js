/**
 * Memoizes an expensive function.
 *
 * @param {Function} func The function to memoize.
 * @return {Function} The memoized function.
 */
function memoize(func) {
  const cache = {};

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      return cache[key];
    }

    const result = func(...args);
    cache[key] = result;
    return result;
  };
}

/**
 * Example of an expensive function (replace with your actual function).
 *
 * @param {number} n A number.
 * @return {number} The nth Fibonacci number.
 */
function expensiveFunction(n) {
  if (n <= 1) {
    return n;
  }
  Utilities.sleep(100); // Simulate a time-consuming operation
  return expensiveFunction(n - 1) + expensiveFunction(n - 2);
}

/**
 * Example usage.
 */
function testMemoize() {
  const memoizedExpensiveFunction = memoize(expensiveFunction);

  // First call will be slow
  const startTime1 = new Date().getTime();
  const result1 = memoizedExpensiveFunction(10);
  const endTime1 = new Date().getTime();
  Logger.log('First call result: ' + result1 + ', time: ' + (endTime1 - startTime1) + 'ms');

  // Second call will be fast (using the cached value)
  const startTime2 = new Date().getTime();
  const result2 = memoizedExpensiveFunction(10);
  const endTime2 = new Date().getTime();
  Logger.log('Second call result: ' + result2 + ', time: ' + (endTime2 - startTime2) + 'ms');

  //Call with different arguments
  const startTime3 = new Date().getTime();
  const result3 = memoizedExpensiveFunction(12);
  const endTime3 = new Date().getTime();
  Logger.log('Third call result: ' + result3 + ', time: ' + (endTime3 - startTime3) + 'ms');
}
