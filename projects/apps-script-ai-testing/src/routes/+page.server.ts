import fs from "fs/promises";
import type { PageServerLoad } from './$types';
import { codeToHtml } from "shiki";
import type { Tests } from "$lib/types";

export const load: PageServerLoad = async () => {


    const outputs = Object.fromEntries(
        await Promise.all(
            (await fs.readdir("generated"))
                .filter((file) => file.endsWith(".log.json"))
                .map(async (file) => {
                    const content = JSON.parse(await fs.readFile(`generated/${file}`, "utf-8"));

                    content.object.code = await codeToHtml(content.object.code, {
                        lang: "javascript",
                        theme: "github-dark"
                    });
                    return [
                        file.slice(0, -9),
                        content];
                }),
        ),
    );


    const tests: Tests = {};

    for (const [file, output] of Object.entries(outputs)) {
        const [id, ...rest] = file.split("-");
        tests[id] = tests[id] || {};
        // @ts-ignore
        tests[id][rest.join("-")] = output;
    }

    const models = new Set(
        Object.values(tests)
            .map(Object.keys)
            .flat()
    );

    return {
        models: Array.from(models), tests
    };
};