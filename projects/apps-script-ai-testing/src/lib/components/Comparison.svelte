<script lang="ts">
    import type { TestCase } from "../types";

    const {
        test,
        models,
        showCode,
    }: { test: TestCase; models: Record<string, boolean>; showCode: boolean } =
        $props();

    function isHidden(key: string) {
        return !models[key];
    }
</script>

<table>
    <thead>
        <tr>
            <th></th>
            {#each Object.entries(test) as [key, value]}
                <th class={isHidden(key) ? "hidden" : ""}>{key}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Duration</th>
            {#each Object.entries(test) as [key, value]}
                <td class={isHidden(key) ? "hidden" : ""}
                    >{new Intl.NumberFormat(undefined, {
                        style: "unit",
                        unit: "second",
                    }).format(value.duration / 1000)}</td
                >
            {/each}
        </tr>
        <tr>
            <th>Tokens</th>
            {#each Object.entries(test) as [key, value]}
                <td class={isHidden(key) ? "hidden" : ""}
                    >{value.usage.totalTokens}</td
                >
            {/each}
        </tr>

        <tr class:hidden={!showCode}>
            <th>Code</th>
            {#each Object.entries(test) as [key, value]}
                <td class="code" class:hidden={isHidden(key)}
                    >{@html value.object.code}</td
                >
            {/each}
        </tr>
    </tbody>
</table>

<style>
    :global(td.code pre) {
        font-size: smaller;
        width: 80ch !important;
        overflow: auto;
    }
</style>
