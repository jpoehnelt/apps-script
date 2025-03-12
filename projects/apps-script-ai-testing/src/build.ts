import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { generateObject, type LanguageModel } from 'ai';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import dotenv from 'dotenv';
import { z } from 'zod';
import { prompts } from "./lib/prompts";

dotenv.config();


const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;


const anthropic = createAnthropic({
    apiKey: ANTHROPIC_API_KEY,
});

const google = createGoogleGenerativeAI({
    apiKey: GOOGLE_API_KEY,
});

const openai = createOpenAI({
    apiKey: OPENAI_API_KEY,
});


const system = 'You are an expert in Google Apps Script writing code. Your output should only be valid code that can be run in Google Apps Script. DO NOT WRITE MARKOWN. RETURN VALID APPS SCRIPT CODE ONLY.';

const modelProviderPairs: [string, (modelName: string) => LanguageModel][] = [
    ["claude-3-7-sonnet-20250219", anthropic],
    ["claude-3-5-haiku-20241022", anthropic],
    ["claude-3-5-sonnet-20241022", anthropic],
    ["gemini-2.0-flash", google],
    ["gemini-2.0-pro-exp-02-05", google],
    ["gemini-1.5-pro", google],
    ["gpt-4.5-preview-2025-02-27", openai],
    ["gpt-4o-2024-11-20", openai],
    ["gpt-4o-mini-2024-07-18", openai],
];

await fs.mkdir('generated', { recursive: true });


for (const [modelName, provider] of modelProviderPairs) {
    for (const { id, prompt } of prompts) {
        console.log(`Generating ${id} for ${modelName}`);
        const name = `generated/${id}-${modelName}`;

        if (!existsSync(name + '.js') || !existsSync(name + '.log.json')) {
            const start = Date.now();
            const result = await generateObject({
                model: provider(modelName),
                schema: z.object({
                    code: z.string().describe('Valid Apps Script code')
                }), prompt, system, temperature: 0, maxTokens: 5000
            });
            const duration = (Date.now() - start);

            await fs.writeFile(name + '.js', result.object.code);
            await fs.writeFile(name + '.log.json', JSON.stringify({ ...result, duration }, null, 2));
        }
    }
}
