const PROJECT_ID =
  PropertiesService.getScriptProperties().getProperty("PROJECT_ID");
const MODEL_ID = "text-embedding-005";
const REGION = "us-central1";

/**
 * Generate embeddings for the given text.
 * @param {string|string[]} text - The text to generate embeddings for.
 * @returns {number[][]} - The generated embeddings.
 */
function batchedEmbeddings_(
  text,
  { model = MODEL_ID, outputDimensionality = 768 } = {}
) {
  if (!Array.isArray(text)) {
    text = [text];
  }

  // Request body
  // {
  //  "instances": [
  // { "content": "TEXT",
  //   "task_type": "TASK_TYPE",
  //   "title": "TITLE"
  // },
  //  ],
  //  "parameters": {
  //    "autoTruncate": AUTO_TRUNCATE,
  //    "outputDimensionality": OUTPUT_DIMENSIONALITY
  //  }
  // }

  const token = ScriptApp.getOAuthToken();

  // TODO chunk in instances of 5
  const requests = text.map((content) => ({
    url: `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/publishers/google/models/${model}:predict`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    muteHttpExceptions: true,
    contentType: "application/json",
    payload: JSON.stringify({
      instances: [{ content }],
      parameters: {
        autoTruncate: true,
        outputDimensionality,
      },
    }),
  }));

  const responses = UrlFetchApp.fetchAll(requests);

  const results = responses.map((response) => {
    if (response.getResponseCode() !== 200) {
      throw new Error(response.getContentText());
    }

    return JSON.parse(response.getContentText());
  });

  // Response body
  // {
  //   "predictions": [
  //     {
  //       "embeddings": {
  //         "statistics": {
  //           "truncated": boolean,
  //           "token_count": integer
  //         },
  //         "values": [ number ]
  //       }
  //     }
  //   ]
  // }

  return results.map((result) => result.predictions[0].embeddings.values);
}


function main() {
  const corpus = [
    "Hello world!",
    "Hello Justin",
    "Apps Script is a platform for building custom business apps",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    "Foo bar",
    "I love dogs 🐕",
    "The forecast is going to be sunny with a 100% chance of sunshine",
  ];
  const index = corpus.map((text) => ({
    text,
    embedding: batchedEmbeddings_([text])[0],
  }));

  const search = corpus[0];
  const searchEmbedding = batchedEmbeddings_([search])[0];

  const results = index.map(({ text, embedding }) => ({
    text,
    similarity: similarity_(embedding, searchEmbedding),
  }));

  const sortedResults = results.sort((a, b) => b.similarity - a.similarity);

  Logger.log(`🔍 searching for "${truncate_(search, 100)}" ...`);
  for (const { text, similarity } of sortedResults) {
    const truncated = truncate_(text, 100);
    Logger.log(`${similarityEmoji_(similarity)} ${similarity.toFixed(5)} - "${truncated}"`);
  }

  // Generate matrix of similarities
  const matrix = index.map(({ embedding }) =>
    index.map(({ embedding: other }) => similarity_(embedding, other))
  );

  const headers = ["", ...corpus].map((text) => truncate_(text, 12).padEnd(15));
  const rows = matrix.map((row, i) => {
    return [
      truncate_(corpus[i], 12).padEnd(15),
      ...row.map((value) => {
        const emoji = similarityEmoji_(value);
        return `${emoji} ${String(value.toFixed(2)).padEnd(9)}`;
      }),
    ].join("\t");
  });

  // Output matrix using ascii table
  Logger.log([headers.join("\t"), ...rows].join("\n"));
}

