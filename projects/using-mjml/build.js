import fs from "fs";
import esbuild from "esbuild";
import path from "path";

const outdir = "dist";
const sourceRoot = "src";

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  outdir,
  sourceRoot,
  platform: "node",
  format: "esm",
  plugins: [],
  inject: ["polyfill.js"],
  minify: true,
  banner: { js: "// Generated code DO NOT EDIT\n" },
  entryNames: "zzz_bundle_[name]",
  chunkNames: "zzz_chunk_[name]",
  // See mocks in https://github.com/mjmlio/mjml/tree/master/packages/mjml-browser
});

const passThroughFiles = ["main.js", "appsscript.json"];

await Promise.all(
  passThroughFiles.map(async (file) =>
    fs.promises.copyFile(path.join(sourceRoot, file), path.join(outdir, file))
  )
);
