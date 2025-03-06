import { FunctionDeclarationSchema } from "@google-cloud/vertexai";

import { z } from "zod";
import { createSchema, extendZodWithOpenApi } from "zod-openapi";
import {
  createGmailUserLabelIfNotExists,
  convertGmailAppThreadToPlainObject,
  memoize,
} from "./helpers.js";

extendZodWithOpenApi(z);

export interface Context {
  thread: GoogleAppsScript.Gmail.GmailThread;
  threadId: string;
}

const SEARCH_GMAIL = z.object({
  query: z.string().openapi({
    description: "Gmail search query",
  }),
});

const CREATE_DRAFT_REPLY = z.object({
  reply: z.string().openapi({
    description: "Draft reply content in plain text",
  }),
});

const MARK_AS_IMPORTANT = z.object({
  important: z.boolean().openapi({
    description: "Whether to mark a message as important",
  }),
});

const DO_NOTHING = z.object({}).openapi({});

const GET_RECENT_INBOX_MESSAGES = z.object({}).openapi({});

const APPLY_LABELS = z.object({
  labelNames: z
    .array(
      z.string().openapi({
        description:
          "Label name using '/' for hierarchy matching: /^[a-z_]+\/[a-z_]+$/",
      })
    )
    .openapi({
      description: "Labels to apply to a message",
    }),
});

function getRecentInboxMessages() {
  return {
    threads: GmailApp.getInboxThreads(0, 10).map(
      convertGmailAppThreadToPlainObject
    ),
  };
}

function searchGmail({ query }: z.infer<typeof SEARCH_GMAIL>) {
  const threads = GmailApp.search(query);
  return {
    query,
    results: GmailApp.search(query, 0, 10)
      .map(convertGmailAppThreadToPlainObject)
      .join("\n\n"),
  };
}

function createDraftReply(
  { reply }: z.infer<typeof CREATE_DRAFT_REPLY>,
  { threadId }: Context
) {
  const draft = GmailApp.getThreadById(threadId).createDraftReply(reply);
  return {
    draftId: draft.getId(),
    reply,
  };
}

function markAsImportant(
  { important }: z.infer<typeof MARK_AS_IMPORTANT>,
  { thread }: Context
) {
  if (important) {
    thread.markImportant();
  } else {
    thread.markUnimportant();
  }

  return { important };
}

function applyLabels(
  { labelNames }: z.infer<typeof APPLY_LABELS>,
  { threadId }: Context
) {
  const addLabelIds = labelNames
    .map(createGmailUserLabelIfNotExists)
    .map((label) => label?.id!);

  try {
    Gmail?.Users?.Threads?.modify(
      {
        addLabelIds,
      },
      "me",
      threadId
    );
  } catch (e) {
    console.error(e as any);
  }

  return { labelNames };
}

export const FUNCTIONS = {
  searchGmail: {
    fn: searchGmail,
    schema: SEARCH_GMAIL,
    declaration: {
      name: "searchGmail",
      description:
        "Search for related Gmail threads and messages. The Gmail query syntax is described here: https://developers.google.com/gmail/api/guides/query. Here are some examples: 'in:inbox after:2025-01-01', 'subject:invoice', 'from:foo@example.com', 'is:starred'",
      parameters: createSchema(SEARCH_GMAIL)
        .schema as unknown as FunctionDeclarationSchema,
    },
  },
  createDraftReply: {
    fn: createDraftReply,
    schema: CREATE_DRAFT_REPLY,
    declaration: {
      name: "createDraftReply",
      description:
        "Create a draft reply to importnant messages that are not transactional emails or from automated systems.",
      parameters: createSchema(CREATE_DRAFT_REPLY)
        .schema as unknown as FunctionDeclarationSchema,
    },
  },
  markAsImportant: {
    fn: markAsImportant,
    schema: MARK_AS_IMPORTANT,
    declaration: {
      name: "markAsImportant",
      description: "Mark a message as important or unimportant",
      parameters: createSchema(MARK_AS_IMPORTANT)
        .schema as unknown as FunctionDeclarationSchema,
    },
  },
  doNothing: {
    fn: () => {},
    schema: DO_NOTHING,
    declaration: {
      name: "doNothing",
      description: "Do nothing and continue to the next task",
      parameters: createSchema(DO_NOTHING)
        .schema as unknown as FunctionDeclarationSchema,
    },
  },
  getRecentInboxMessages: {
    fn: memoize(getRecentInboxMessages, 10),
    schema: GET_RECENT_INBOX_MESSAGES,
    declaration: {
      name: "getRecentInboxMessages",
      description: "Get recent Gmail messages",
      parameters: createSchema(GET_RECENT_INBOX_MESSAGES)
        .schema as unknown as FunctionDeclarationSchema,
    },
  },
  applyLabels: {
    fn: applyLabels,
    schema: APPLY_LABELS,
    declaration: {
      name: "applyLabels",
      description: "Apply labels to a Gmail message",
      parameters: createSchema(APPLY_LABELS)
        .schema as unknown as FunctionDeclarationSchema,
    },
  },
};
