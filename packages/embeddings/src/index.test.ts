import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { batchedEmbeddings, similarity, similarityEmoji } from "./index.js";

// Mock Google Apps Script global objects
global.ScriptApp = {
	getOAuthToken: vi.fn().mockReturnValue("mock-token"),
} as unknown as typeof ScriptApp;
global.PropertiesService = {
	getScriptProperties: vi.fn().mockReturnValue({
		getProperty: vi
			.fn()
			.mockImplementation((key) =>
				key === "PROJECT_ID" ? "mock-project-id" : null,
			),
	}),
} as unknown as typeof PropertiesService;

const fetchAll = vi.fn();
global.UrlFetchApp = { fetchAll } as unknown as typeof UrlFetchApp;

describe("similarity", () => {
	it("calculates cosine similarity correctly", () => {
		// Parallel vectors (should be 1.0)
		expect(similarity([1, 2, 3], [2, 4, 6])).toBeCloseTo(1.0);

		// Orthogonal vectors (should be 0.0)
		expect(similarity([1, 0, 0], [0, 1, 0])).toBeCloseTo(0.0);

		// Opposite vectors (should be -1.0)
		expect(similarity([1, 2, 3], [-1, -2, -3])).toBeCloseTo(-1.0);
	});

	it("throws an error when vectors have different lengths", () => {
		expect(() => similarity([1, 2, 3, 4], [1, 2, 3])).toThrow(
			"Vectors must have the same length",
		);
	});
});

describe("similarityEmoji", () => {
	it("returns the correct emoji based on similarity value", () => {
		expect(similarityEmoji(1.0)).toBe("🔥"); // Very high (>=0.9)
		expect(similarityEmoji(0.8)).toBe("✅"); // High (>=0.7 and <0.9)
		expect(similarityEmoji(0.6)).toBe("👍"); // Medium (>=0.5 and <0.7)
		expect(similarityEmoji(0.4)).toBe("🤔"); // Low (>=0.3 and <0.5)
		expect(similarityEmoji(0.2)).toBe("❌"); // Very low (<0.3)
	});
});

describe("batchedEmbeddings", () => {
	const mockResponse = {
		getResponseCode: vi.fn().mockReturnValue(200),
		getContentText: vi.fn().mockReturnValue(
			JSON.stringify({
				predictions: [{ embeddings: { values: [0.1, 0.2, 0.3] } }],
			}),
		),
	};

	beforeEach(() => {
		vi.clearAllMocks();
		fetchAll.mockReturnValue([mockResponse]);
	});

	it("handles single string input", () => {
		const result = batchedEmbeddings("test text");

		expect(fetchAll).toHaveBeenCalledTimes(1);
		const requests = fetchAll.mock.calls[0][0];
		expect(requests).toHaveLength(1);

		const payload = JSON.parse(requests[0].payload);
		expect(payload.instances[0].content).toBe("test text");

		expect(result).toEqual([[0.1, 0.2, 0.3]]);
	});

	it("handles array of strings input", () => {
		const mockResponses = [
			{
				getResponseCode: vi.fn().mockReturnValue(200),
				getContentText: vi.fn().mockReturnValue(
					JSON.stringify({
						predictions: [{ embeddings: { values: [0.1, 0.2, 0.3] } }],
					}),
				),
			},
			{
				getResponseCode: vi.fn().mockReturnValue(200),
				getContentText: vi.fn().mockReturnValue(
					JSON.stringify({
						predictions: [{ embeddings: { values: [0.4, 0.5, 0.6] } }],
					}),
				),
			},
		];

		fetchAll.mockReturnValue(mockResponses);

		const result = batchedEmbeddings(["text1", "text2"]);
		expect(result).toEqual([
			[0.1, 0.2, 0.3],
			[0.4, 0.5, 0.6],
		]);
	});

	it("uses custom parameters and handles errors", () => {
		// Test custom parameters
		batchedEmbeddings("test", {
			model: "custom-model",
			parameters: {},
			projectId: "custom-project",
			region: "custom-region",
		});

		const requests = fetchAll.mock.calls[0][0];
		expect(requests[0].url).toContain("custom-region");
		expect(requests[0].url).toContain("custom-model");

		// Test error handling
		fetchAll.mockReturnValue([
			{
				getResponseCode: vi.fn().mockReturnValue(400),
				getContentText: vi.fn().mockReturnValue("Bad Request"),
			},
		]);

		expect(() => batchedEmbeddings("test")).toThrow("Bad Request");
	});
});
