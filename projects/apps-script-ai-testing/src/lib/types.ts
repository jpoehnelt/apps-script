interface TestCase {
    [model: string]: {
        duration: number;
        object: { code: string; },
        usage: {
            promptTokens: number;
            completionTokens: number;
            totalTokens: number;
        };
    };
}

interface Tests {
    [id: string]: TestCase;
}

export type { TestCase, Tests };
