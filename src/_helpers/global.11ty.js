
const esbuild = require('esbuild');

module.exports = class {
	data() {
		return {
			layout: false,
			permalink: '/global.js',
			eleventyExcludeFromCollections: true,
		};
	}

	async render() {
		let output = '';
		let result = await esbuild.build({
			bundle: true,
			minify: true,
			entryPoints: ['src/assets/js/global.js'],
			write: false,
			outdir: 'out',
		});

		for (let out of result.outputFiles) {
			output += out.text;
		}

		return output;
	}
};
