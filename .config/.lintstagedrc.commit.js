export default {
	"**/*.{js,ts,json}": (filenames) =>
		filenames.length ? [`pnpm biome --write ${filenames.join(" ")}`] : [],
	"!(**/*.{js,ts,json})": (filenames) =>
		filenames.length ? [`pnpm prettier --check ${filenames.join(" ")}`] : [],
};
