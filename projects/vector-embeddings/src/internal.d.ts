declare function batchedEmbeddings_(
  text: string | string[],
  { model }?: { model?: string }
): number[][];

declare function similarity_(x: number[], y: number[]): number;

declare function truncate(text: string, maxLength: number): string;

declare const similarityEmoji_: (value: number) => string;

declare const dotProduct_: (x: number[], y: number[]) => number;

declare const magnitude_: (x: number[]) => number;


