export default {
	"*": (filenames) => (filenames.length >= 5 ? ["pnpm build check test"] : []),
};
