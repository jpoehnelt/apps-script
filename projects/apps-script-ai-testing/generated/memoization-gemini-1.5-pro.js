/**
 * Memoizes an expensive function call.
 *
 * @param {function} func The expensive function to memoize.
 * @return {function} The memoized function.
 */
function memoize(func) {
  const cache = new Map();

  return function memoized(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

/**
 * An example of an expensive function.
 *
 * @param {number} n The number to calculate the factorial of.
 * @return {number} The factorial of n.
 */
expensiveFunction = (n) => {
  console.log(`Calculating factorial of ${n}...`);
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

/**
 * Memoized version of expensiveFunction
 */
const memoizedExpensiveFunction = memoize(expensiveFunction);

/**
 * Example usage.
 */
function testMemoize() {
  console.log(memoizedExpensiveFunction(5)); // Calculates and returns 120
  console.log(memoizedExpensiveFunction(5)); // Returns 120 from cache
  console.log(memoizedExpensiveFunction(6)); // Calculates and returns 720
  console.log(memoizedExpensiveFunction(5)); // Returns 120 from cache
  console.log(memoizedExpensiveFunction(6)); // Returns 720 from cache
};