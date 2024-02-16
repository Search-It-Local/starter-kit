
const { glob } = require('glob');

module.exports = async function (dir, options = {}) {
	// Set default options
	let defaultOptions = {
		frontend: true, // Replace the system path with a slash
		glob: {}, // Options to pass to Glob, see https://github.com/isaacs/node-glob?tab=readme-ov-file#options
	};

	// Merge options
	options = { ...defaultOptions, ...options };

	const paths = await glob(dir, options?.glob);
	return paths.map((path) => {
		return options?.frontend ? path.replace('src/', '/') : path;
	});
};
