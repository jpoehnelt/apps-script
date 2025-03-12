<script lang="ts">
    import "../app.css";
    import { prompts } from "../lib/prompts";
    import Comparison from "../lib/components/Comparison.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    const { tests } = data;

    const models = $state(
        Object.fromEntries(data.models.map((model) => [model, true])),
    );

    let showCode = $state(true);
</script>

<div class="p-8 relative">
    <div
        class="sticky top-0 bg-white -mx-8 px-8 py-2 mb-4 border-b border-gray-200 shadow flex gap-2 flex-col"
    >
        <h1 class="text-3xl mb-4">
            Comparing AI Code Generation for Apps Script <a
                href="https://github.com/jpoehnelt/apps-script">(source)</a
            >
        </h1>
        <div class="flex gap-1 flex-wrap mb-2">
            {#each Object.keys(models) as model}
                <label class="flex items-center gap-2 bg-gray-200 rounded p-2">
                    <input
                        type="checkbox"
                        name="model"
                        value={model}
                        checked={models[model]}
                        onchange={() => {
                            models[model] = !models[model];
                        }}
                    />
                    {model}
                </label>
            {/each}
        </div>
        <div class="flex gap-1 flex-wrap">
            <strong>Test Cases:</strong>
            {#each Object.keys(tests) as id}
                <a class="underline" href={`#test-case-${id}`}
                    ><code>{id}</code></a
                >
                {#if id !== Object.keys(tests).at(-1)}<span
                        class="text-gray-500">|</span
                    >{/if}
            {/each}
        </div>
        <label class="flex items-center gap-2 bg-gray-200 rounded p-2 w-fit">
            <input type="checkbox" name="model" bind:checked={showCode} />
            Display Code
        </label>
    </div>
    <div class="prose !max-w-none">
        {#each Object.entries(tests) as [id, outputs]}
            <span id={`test-case-${id}`} class="block relative top-[-200px]"
            ></span>
            <h2>Test Case: <code>{id}</code></h2>

            <blockquote>
                {prompts.find((p) => p.id === id)?.prompt}
            </blockquote>
            <Comparison test={outputs} {models} {showCode} />
        {/each}
    </div>
</div>
