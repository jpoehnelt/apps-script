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
  // Simulate an expensive computation
  for (let i = 0; i < 1e6; i++) {}  
  return num * 2;
}

// Memoized version of the expensive function
const memoizedExpensiveFunction = memoize(expensiveFunction);

// Example usage
function testMemoization() {
  Logger.log(memoizedExpensiveFunction(5)); // Computes and caches the result
  Logger.log(memoizedExpensiveFunction(5)); // Returns cached result
  Logger.log(memoizedExpensiveFunction(10)); // Computes and caches the result
  Logger.log(memoizedExpensiveFunction(10)); // Returns cached result
}