const MODEL_ID = "text-embedding-005";
const REGION = "us-central1";

interface Parameters {
	autoTruncate?: boolean;
	outputDimensionality?: number;
}

interface Instance {
	task_type?:
		| "RETRIEVAL_DOCUMENT"
		| "RETRIEVAL_QUERY"
		| "SEMANTIC_SIMILARITY"
		| "CLASSIFICATION"
		| "CLUSTERING"
		| "QUESTION_ANSWERING"
		| "FACT_VERIFICATION"
		| "CODE_RETRIEVAL_QUERY";
	title?: string;
	content: string;
}

/**
 * Options for generating embeddings.
 */
interface Options {
	/**
	 * The project ID that the model is in.
	 * @default 'PropertiesService.getScriptProperties().getProperty("PROJECT_ID")'
	 */
	projectId?: string;

	/**
	 * The ID of the model to use.
	 * @default 'text-embedding-005'.
	 */
	model?: string;

	/**
	 * Additional parameters to pass to the model.
	 */
	parameters?: Parameters;

	/**
	 * The region that the model is in.
	 * @default 'us-central1'
	 */
	region?: string;

	/**
	 * The OAuth token to use to authenticate the request.
	 * @default `ScriptApp.getOAuthToken()`
	 */
	token?: string;
}

const getProjectId = (): string => {
	const projectId =
		PropertiesService.getScriptProperties().getProperty("PROJECT_ID");
	if (!projectId) {
		throw new Error("PROJECT_ID not found in script properties");
	}

	return projectId;
};

/**
 * Generate embeddings for the given text content.
 *
 * @param content - The text content to generate embeddings for.
 * @param options - Options for the embeddings generation.
 * @returns The generated embeddings.
 *
 * @see https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api
 */
export function getTextEmbeddings(
	contentOrContentArray: string | string[],
	options: Options = {},
): number[][] {
	const inputs = Array.isArray(contentOrContentArray)
		? contentOrContentArray
		: [contentOrContentArray];

	return getBatchedEmbeddings(
		inputs.map((content) => ({ content })),
		options,
	);
}

/**
 * Generate embeddings for the given instances in parallel UrlFetchApp requests.
 *
 * @param instances - The instances to generate embeddings for.
 * @param options - Options for the embeddings generation.
 * @returns The generated embeddings.
 *
 * @see https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api
 */
export function getBatchedEmbeddings(
	instances: Instance[],
	{
		parameters = {},
		model = MODEL_ID,
		projectId = getProjectId(),
		region = REGION,
		token = ScriptApp.getOAuthToken(),
	}: Options = {},
): number[][] {
	const chunks = chunkArray(instances, 5);
	const requests = chunks.map((instances) => ({
		url: `https://${region}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${region}/publishers/google/models/${model}:predict`,
		method: "post" as const,
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		muteHttpExceptions: true,
		contentType: "application/json",
		payload: JSON.stringify({
			instances,
			parameters,
		}),
	}));

	const responses = UrlFetchApp.fetchAll(requests);

	const results = responses.map((response) => {
		if (response.getResponseCode() !== 200) {
			throw new Error(response.getContentText());
		}

		return JSON.parse(response.getContentText());
	});

	return results.flatMap((result) =>
		result.predictions.map(
			(prediction: { embeddings: { values: number[] } }) =>
				prediction.embeddings.values,
		),
	);
}

/**
 * Calculates the dot product of two vectors.
 * @param x - The first vector.
 * @param y - The second vector.
 */
function dotProduct_(x: number[], y: number[]): number {
	let result = 0;
	for (let i = 0, l = Math.min(x.length, y.length); i < l; i += 1) {
		result += x[i] * y[i];
	}
	return result;
}

/**
 * Calculates the magnitude of a vector.
 * @param x - The vector.
 */
function magnitude(x: number[]): number {
	let result = 0;
	for (let i = 0, l = x.length; i < l; i += 1) {
		result += x[i] ** 2;
	}
	return Math.sqrt(result);
}

/**
 * Calculates the cosine similarity between two vectors.
 * @param x - The first vector.
 * @param y - The second vector.
 * @returns The cosine similarity value between -1 and 1.
 */
export function similarity(x: number[], y: number[]): number {
	if (x.length !== y.length) {
		throw new Error("Vectors must have the same length");
	}
	return dotProduct_(x, y) / (magnitude(x) * magnitude(y));
}

/**
 * Returns an emoji representing the similarity value.
 * @param value - The similarity value.
 */
export const similarityEmoji = (value: number): string => {
	if (value >= 0.9) return "🔥"; // Very high similarity
	if (value >= 0.7) return "✅"; // High similarity
	if (value >= 0.5) return "👍"; // Medium similarity
	if (value >= 0.3) return "🤔"; // Low similarity
	return "❌"; // Very low similarity
};

function chunkArray<T>(array: T[], size: number): T[][] {
	const chunks: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		chunks.push(array.slice(i, i + size));
	}
	return chunks;
}
