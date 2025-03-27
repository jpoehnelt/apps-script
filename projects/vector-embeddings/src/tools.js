/**
 * Calculates the dot product of two vectors.
 * @param {number[]} x - The first vector.
 * @param {number[]} y - The second vector.
 * @returns {number} The dot product of the two vectors.
 */
function dotProduct_(x, y) {
  let result = 0;
  for (let i = 0, l = Math.min(x.length, y.length); i < l; i += 1) {
    result += x[i] * y[i];
  }
  return result;
}

/**
 * Calculates the magnitude of a vector.
 * @param {number[]} x - The vector.
 * @returns {number} The magnitude of the vector.
 */
function magnitude_(x) {
  let result = 0;
  for (let i = 0, l = x.length; i < l; i += 1) {
    result += x[i] ** 2;
  }
  return Math.sqrt(result);
}

/**
 * Calculates the cosine similarity between two vectors.
 * @param {number[]} x - The first vector.
 * @param {number[]} y - The second vector.
 * @returns {number} The cosine similarity value between -1 and 1.
 */
function similarity_(x, y) {
  return dotProduct_(x, y) / (magnitude_(x) * magnitude_(y));
}

function truncate_(text, maxLength) {
  return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
}

const similarityEmoji_ = (value) => {
  if (value >= 0.9)
    return "🔥"; // Very high similarity
  else if (value >= 0.7)
    return "✅"; // High similarity
  else if (value >= 0.5)
    return "👍"; // Medium similarity
  else if (value >= 0.3)
    return "🤔"; // Low similarity
  else return "❌"; // Very low similarity
};
