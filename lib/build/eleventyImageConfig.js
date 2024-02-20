
const tailwindConfig = require('../../tailwind.config.js');

// Get the screen sizes from the Tailwind config, create an array of the values and double them
const screens = Object.values(tailwindConfig.theme.screens).map((size) => size.replace('px', '') * 2);

module.exports = {
	extensions: 'html',
	formats: ['webp', 'jpeg'],
	widths: ['auto', ...screens],
	defaultAttributes: {
		loading: 'lazy',
		decoding: 'async',
	},
};
