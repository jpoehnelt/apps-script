import {
  type Content,
  type FunctionDeclaration,
  type FunctionCallingMode,
  type FunctionResponsePart,
} from "@google-cloud/vertexai";
import { serializeGmailAppThread } from "./helpers.js";

import { generate, isFunctionCallPart } from "./vertex.js";
import { FUNCTIONS } from "./functions.js";

const SYSTEM_INSTRUCTION = {
  role: "system",
  parts: [
    {
      text: "You are an administrative assistant helping to manage my Gmail inbox.",
    },
    {
      text: "Be sure you have enough context and search for related messages as necessary, try searching before other actions. Multiple actions should be taken. Do not repeat actions.",
    },
  ],
};

const TOOLS = [
  {
    functionDeclarations: Object.values(FUNCTIONS).map(
      (fn) => fn.declaration
    ) as FunctionDeclaration[],
  },
];

function main_({ MODEL, PROJECT_ID }: { MODEL: string; PROJECT_ID: string }) {
  const threads = GmailApp.getInboxThreads(0, 50);

  console.log(JSON.stringify(TOOLS, null, 2));

  for (const thread of threads) {
    const contents: Content[] = [
      {
        role: "user",
        parts: [
          {
            text: `Here is a email thread in my Gmail inbox, help me manage it:`,
          },
          {
            text: serializeGmailAppThread(thread),
          },
        ],
      },
    ];

    let isDone = false;

    const functionCalls = Object.fromEntries(
      Object.keys(FUNCTIONS).map((key) => [key, [] as any[]])
    );

    let shouldPlan = true;

    while (!isDone) {
      const allowedFunctionNames: string[] = Object.keys(FUNCTIONS).filter(
        (key) => functionCalls[key].length === 0
      );

      let mode: FunctionCallingMode = "ANY" as FunctionCallingMode;

      if (shouldPlan) {
        contents.push({
          role: "user",
          parts: [
            {
              text: `Generate a multistep plan for this email thread using only the available tools: ${JSON.stringify(
                TOOLS
              )}`,
            },
          ],
        });

        // Only plan once
        shouldPlan = false;
        // Do not call any functions while planning
        mode = "NONE" as FunctionCallingMode;
        allowedFunctionNames.length = 0;
      }

      const output = generate(
        {
          contents,
          tools: TOOLS,
          systemInstruction: SYSTEM_INSTRUCTION,
          toolConfig: {
            functionCallingConfig: {
              mode,
              // only call functions that we haven't called before
              allowedFunctionNames,
            },
          },
        },
        { MODEL, PROJECT_ID }
      );

      if (!output.candidates?.[0]) {
        // Just for TypeScript
        throw new Error("No candidates");
      }

      const { content } = output.candidates[0];
      console.log(JSON.stringify(content, null, 2));

      // push the function call to the contents
      contents.push(content);

      const functionReponsePart: FunctionResponsePart[] = content.parts
        .filter(isFunctionCallPart)
        .map((part) => {
          const name = part.functionCall.name as keyof typeof FUNCTIONS;
          const args = part.functionCall.args;

          if (name === "doNothing") {
            isDone = true;
          }

          functionCalls[name].push(args);
          const { fn, schema } = FUNCTIONS[name as keyof typeof FUNCTIONS];

          if (!fn || !schema) {
            throw new Error(`Function ${name} not defined`);
          }

          console.log(
            `${thread.getFirstMessageSubject()} - Calling ${name} with ${JSON.stringify(args)}`
          );

          const content = fn(schema.parse(args) as any, {
            thread,
            threadId: thread.getId(),
          });

          return {
            functionResponse: {
              name,
              response: {
                content,
              },
            },
          };
        });

      if (functionReponsePart.length > 0) {
        contents.push({
          role: "user",
          parts: functionReponsePart,
        });
      }
    }
  }
}

// @ts-ignore
globalThis.main_ = main_;
