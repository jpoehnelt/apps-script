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

// Example usage:
function expensiveCalculation(num) {
  Utilities.sleep(2000); // Simulate expensive operation
  return num * num;
}

const memoizedCalculation = memoize(expensiveCalculation);

function testMemoization() {
  Logger.log(memoizedCalculation(5)); // Takes time initially
  Logger.log(memoizedCalculation(5)); // Returns instantly from cache
}