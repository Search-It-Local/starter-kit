
const findCustomElements = require('./lib/build/findCustomElements');
const iconShortcode = require('./lib/shortcodes/icon');
const globFilter = require('./lib/filters/glob');

module.exports = function (eleventyConfig) {
	// Shortcodes
	eleventyConfig.addShortcode('icon', iconShortcode);

	// Filters
	eleventyConfig.addFilter('glob', globFilter);

	// Passthrough Files/Directories
	eleventyConfig.addPassthroughCopy('src/assets');
	eleventyConfig.addPassthroughCopy('src/favicon.ico');

	// Custom Watch Targets
	eleventyConfig.addWatchTarget('./site.config.js');
	eleventyConfig.addWatchTarget('./tailwind.config.js');

	// Find and inject scripts for custom elements
	eleventyConfig.on('eleventy.after', findCustomElements);

	return {
		dir: {
			input: 'src',
		},
	};
};
