/**
 * Creates a memoized version of a function that caches its results
 * @param {Function} fn - The function to memoize
 * @return {Function} - The memoized function
 */
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    // Create a cache key by stringifying the arguments
    const key = JSON.stringify(args);
    
    // Check if result exists in cache
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    // Calculate result and store in cache
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example usage:
function expensiveCalculation(n) {
  // Simulate expensive computation
  Utilities.sleep(1000);
  return n * n;
}

// Create memoized version
const memoizedCalc = memoize(expensiveCalculation);

function testMemoization() {
  console.time('First call');
  console.log(memoizedCalc(5)); // Takes ~1 second
  console.timeEnd('First call');
  
  console.time('Second call');
  console.log(memoizedCalc(5)); // Instant (cached)
  console.timeEnd('Second call');
  
  console.time('New input');
  console.log(memoizedCalc(10)); // Takes ~1 second (new calculation)
  console.timeEnd('New input');
}