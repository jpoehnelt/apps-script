/**
 * Memoizes a function call to improve performance.
 *
 * @param {function} func The function to memoize.
 * @return {function} The memoized function.
 */
function memoizeFunction(func) {
  const cache = {};

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.log(`Returning cached result for key: ${key}`);
      return cache[key];
    }

    console.log(`Calculating result for key: ${key}`);
    const result = func.apply(this, args);
    cache[key] = result;
    return result;
  };
}


/**
 * Example of an expensive function (simulated with a delay).
 *
 * @param {number} a
 * @param {number} b
 */
function expensiveFunction(a, b) {
  // Simulate a time-consuming operation (e.g., network request, complex calculation)
  Utilities.sleep(1000); // Pause for 1 second
  return a + b;
}


/**
 * Example usage of the memoization function.
 */
function testMemoization() {
  const memoizedExpensiveFunction = memoizeFunction(expensiveFunction);

  // First call (calculates and caches the result)
  const result1 = memoizedExpensiveFunction(2, 3);
  console.log(`Result 1: ${result1}`); // Output: 5 (after a 1-second delay)

  // Second call (retrieves from cache)
  const result2 = memoizedExpensiveFunction(2, 3);
  console.log(`Result 2: ${result2}`); // Output: 5 (immediately)

  // Third call with different arguments (calculates and caches)
  const result3 = memoizedExpensiveFunction(5, 4);
  console.log(`Result 3: ${result3}`); // Output: 9 (after a 1-second delay)

    // Fourth call (retrieves from cache)
  const result4 = memoizedExpensiveFunction(5, 4);
  console.log(`Result 4: ${result4}`); // Output: 9 (immediately)

      // Fifth call (calculates and caches)
  const result5 = memoizedExpensiveFunction(5, 4, 9);
  console.log(`Result 5: ${result5}`); // Output: NaN, because expensiveFunction only takes two arguments.  (after a 1-second delay)


}

