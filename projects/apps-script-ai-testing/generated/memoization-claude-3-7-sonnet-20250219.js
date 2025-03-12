/**
 * Creates a memoized version of a function.
 * The memoized function caches results for previously used arguments.
 * 
 * @param {Function} fn - The function to memoize
 * @return {Function} A memoized version of the function
 */
function memoize(fn) {
  // Create a cache to store results
  const cache = {};
  
  // Return the memoized function
  return function(...args) {
    // Create a key from the arguments
    const key = JSON.stringify(args);
    
    // If we have a cached result for these arguments, return it
    if (cache.hasOwnProperty(key)) {
      console.log('Returning cached result for:', args);
      return cache[key];
    }
    
    // Otherwise, call the original function and cache the result
    const result = fn.apply(this, args);
    cache[key] = result;
    console.log('Caching new result for:', args);
    return result;
  };
}

/**
 * Example usage with an expensive function
 */
function expensiveCalculation(n) {
  console.log('Performing expensive calculation for:', n);
  
  // Simulate an expensive operation
  Utilities.sleep(1000);
  
  return n * n;
}

/**
 * Test the memoization
 */
function testMemoization() {
  // Create a memoized version of the expensive function
  const memoizedCalculation = memoize(expensiveCalculation);
  
  console.log('First call with 5:');
  console.log(memoizedCalculation(5)); // Will perform the calculation
  
  console.log('Second call with 5:');
  console.log(memoizedCalculation(5)); // Will use cached result
  
  console.log('Call with 10:');
  console.log(memoizedCalculation(10)); // Will perform the calculation
  
  console.log('Another call with 5:');
  console.log(memoizedCalculation(5)); // Will use cached result
}

/**
 * Example with a more complex function that fetches data
 */
function fetchDataFromApi(id) {
  console.log('Fetching data for ID:', id);
  
  // Simulate API call
  Utilities.sleep(2000);
  
  return {
    id: id,
    name: 'Item ' + id,
    timestamp: new Date().toISOString()
  };
}

/**
 * Test memoization with API calls
 */
function testApiMemoization() {
  const memoizedFetch = memoize(fetchDataFromApi);
  
  console.log('First fetch for ID 123:');
  console.log(memoizedFetch(123));
  
  console.log('Second fetch for ID 123 (should be cached):');
  console.log(memoizedFetch(123));
  
  console.log('Fetch for ID 456:');
  console.log(memoizedFetch(456));
}