export default {
  "**/*.{js,ts,json}": (filenames) =>
    filenames.length ? [`biome check --write ${filenames.join(" ")}`] : [],
  "!(**/*.{js,ts,json})": (filenames) =>
    filenames.length ? [`prettier --write ${filenames.join(" ")}`] : [],
};
