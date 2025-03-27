/**
 * Basic semantic search function
 * @param {string} query The search query
 * @param {Array<string>} corpus The corpus of text to search through
 * @return {Array<Object>} The search results with similarity scores
 */
function semanticSearch(query, corpus) {
  // Generate embedding for the query
  const queryEmbedding = batchedEmbeddings_([query])[0];
  
  // Create or use existing index
  const index = corpus.map((text) => ({
    text,
    embedding: batchedEmbeddings_([text])[0],
  }));
  
  // Calculate similarities
  const results = index.map(({ text, embedding }) => ({
    text,
    similarity: similarity_(embedding, queryEmbedding),
  }));
  
  // Sort by similarity (highest first)
  return results.sort((a, b) => b.similarity - a.similarity);
}

/**
 * Custom function for Google Sheets to perform semantic search
 * @param {string} query The search query
 * @param {GoogleAppsScript.Spreadsheet.Range} dataRange The range containing the text to search through
 * @param {number} limit Optional limit on number of results
 * @return {Array<Array<*>>} The search results with similarity scores
 * @customfunction
 */
function SEMANTIC_SEARCH(query, dataRange, limit = 5) {
  const corpus = dataRange.getValues().flat().filter(Boolean);
  const results = semanticSearch(query, corpus);
  
  return results
    .slice(0, limit)
    .map(({ text, similarity }) => [text, similarity]);
}

/**
 * Document classification using embeddings
 * @param {string} document The document to classify
 * @param {Array<string>} categories List of possible categories
 * @return {string} The most similar category
 */
function classifyDocument(document = "I love dogs", categories = ["Software", "Animal", "Food"]) {
  const docEmbedding = batchedEmbeddings_([document])[0];
  const categoryEmbeddings = batchedEmbeddings_(categories);
  
  const similarities = categoryEmbeddings.map((catEmbedding, index) => ({
    category: categories[index],
    similarity: similarity_(docEmbedding, catEmbedding)
  }));
  
  // Return the most similar category
  return similarities.sort((a, b) => b.similarity - a.similarity)[0].category;
}
