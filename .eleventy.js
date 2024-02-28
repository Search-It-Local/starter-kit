const bundlerPlugin = require('@11ty/eleventy-plugin-bundle');

const componentAssetsShortcode = require('./lib/shortcodes/component-assets.js');
const findCustomElements = require('./lib/build/findCustomElements');
const ariaFilter = require('./lib/filters/aria');
const globFilter = require('./lib/filters/glob');
const limitFilter = require('./lib/filters/limit');
const iconShortcode = require('./lib/shortcodes/icon');
const imageShortcode = require('./lib/shortcodes/image');
const markdownShortcode = require('./lib/shortcodes/markdown');
const mergeClassesFilter = require('./lib/filters/mergeClasses');
const siteConfig = require('./site.js');

module.exports = function (eleventyConfig) {
	// Site Config
	eleventyConfig.addGlobalData('site', siteConfig);

	// Shortcodes
	eleventyConfig.addShortcode('componentAssets', componentAssetsShortcode);
	eleventyConfig.addShortcode('icon', iconShortcode);
	eleventyConfig.addShortcode('image', imageShortcode);
	eleventyConfig.addPairedShortcode('markdown', markdownShortcode);

	// Filters
	eleventyConfig.addFilter('aria', ariaFilter);
	eleventyConfig.addFilter('glob', globFilter);
	eleventyConfig.addFilter('limit', limitFilter);
	eleventyConfig.addFilter('mergeClasses', mergeClassesFilter);

	// Passthrough Files/Directories
	eleventyConfig.addPassthroughCopy('src/assets');
	eleventyConfig.addPassthroughCopy('src/favicon.ico');

	// Custom Watch Targets
	eleventyConfig.addWatchTarget('./site.config.js');
	eleventyConfig.addWatchTarget('./tailwind.config.js');

	// Plugins
	eleventyConfig.addPlugin(bundlerPlugin);

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
