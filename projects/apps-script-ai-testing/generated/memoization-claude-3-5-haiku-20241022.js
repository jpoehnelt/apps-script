/**
 * Creates a memoization wrapper for an expensive function
 * @param {Function} fn - The function to memoize
 * @return {Function} Memoized version of the function
 */
function memoize(fn) {
  // Cache to store previous function results
  const cache = {};
  
  return function(...args) {
    // Create a unique key from the arguments
    const key = JSON.stringify(args);
    
    // If result is already in cache, return cached value
    if (key in cache) {
      return cache[key];
    }
    
    // Otherwise, call the original function and cache the result
    const result = fn.apply(this, args);
    cache[key] = result;
    
    return result;
  };
}

// Example of an expensive function to memoize
function expensiveCalculation(n) {
  // Simulate an expensive computation
  Utilities.sleep(2000); // Simulate 2-second delay
  return n * n;
}

// Create a memoized version of the expensive function
const memoizedCalculation = memoize(expensiveCalculation);

// Demonstration function to show memoization working
function demonstrateMemoization() {
  // First call will take 2 seconds
  const start1 = new Date().getTime();
  const result1 = memoizedCalculation(5);
  const end1 = new Date().getTime();
  Logger.log('First call time: ' + (end1 - start1) + 'ms');
  
  // Second call with same argument will be instant
  const start2 = new Date().getTime();
  const result2 = memoizedCalculation(5);
  const end2 = new Date().getTime();
  Logger.log('Second call time: ' + (end2 - start2) + 'ms');
  
  // Verify results are the same
  Logger.log('Result 1: ' + result1);
  Logger.log('Result 2: ' + result2);
}