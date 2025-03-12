function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Example of an expensive function
function expensiveFunction(num) {
  Utilities.sleep(2000); // Simulate a time-consuming operation
  return num * num;
}

// Memoized version of the expensive function
const memoizedExpensiveFunction = memoize(expensiveFunction);

function testMemoization() {
  Logger.log(memoizedExpensiveFunction(5)); // First call, will take time
  Logger.log(memoizedExpensiveFunction(5)); // Second call, will return cached result
}