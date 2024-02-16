
const esbuild = require('esbuild');
const esbuildPostCSS = require('esbuild-postcss');

module.exports = class {
	data() {
		return {
			layout: false,
			permalink: '/style.css',
			eleventyExcludeFromCollections: true,
		};
	}

	async render() {
		let output = '';
		let result = await esbuild.build({
			entryPoints: ['src/assets/css/style.css'],
			minify: true,
			write: false,
			outdir: 'out',
			plugins: [esbuildPostCSS(['.postcss', '.css'])],
		});

		for (let out of result.outputFiles) {
			output += out.text;
		}

		return output;
	}
};
