
const bundlerPlugin = require('@11ty/eleventy-plugin-bundle');
const { eleventyImageTransformPlugin } = require('@11ty/eleventy-img');

const siteConfig = require('./site.js');
const findCustomElements = require('./lib/build/findCustomElements');
const eleventyImageConfig = require('./lib/build/eleventyImageConfig');
const componentAssetsShortcode = require('./lib/shortcodes/component-assets.js');
const iconShortcode = require('./lib/shortcodes/icon');
const globFilter = require('./lib/filters/glob');
const mergeClassesFilter = require('./lib/filters/mergeClasses');

module.exports = function (eleventyConfig) {
	// Site Config
	eleventyConfig.addGlobalData('site', siteConfig);

	// Shortcodes
	eleventyConfig.addShortcode('componentAssets', componentAssetsShortcode);
	eleventyConfig.addShortcode('icon', iconShortcode);

	// Filters
	eleventyConfig.addFilter('glob', globFilter);
	eleventyConfig.addFilter('mergeClasses', mergeClassesFilter);

	// Passthrough Files/Directories
	eleventyConfig.addPassthroughCopy('src/assets');
	eleventyConfig.addPassthroughCopy('src/favicon.ico');

	// Custom Watch Targets
	eleventyConfig.addWatchTarget('./site.config.js');
	eleventyConfig.addWatchTarget('./tailwind.config.js');

	// Plugins
	eleventyConfig.addPlugin(bundlerPlugin);
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, eleventyImageConfig);

	// Find and inject scripts for custom elements and components
	eleventyConfig.on('eleventy.after', async ({ results }) => {
		await findCustomElements({ results });
	});

	return {
		dir: {
			input: 'src',
		},
	};
};
