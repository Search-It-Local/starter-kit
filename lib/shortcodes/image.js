const Image = require('@11ty/eleventy-img');
const tailwindConfig = require('../../tailwind.config.js');

// Create an array of screen sizes, each one doubled
const screens = [];
Object.values(tailwindConfig.theme.screens).forEach((value) => {
	screens.push(value.replace('px', '') * 2);
});

module.exports = function (src, attributes = {}) {
	let fullSrc = `./src${src}`;
	let options = {
		widths: screens,
		formats: ['avif', 'webp', 'jpeg'],
		urlPath: '/images/',
		outputDir: './_site/images/',
	};

	Image(fullSrc, options);

	let metadata = Image.statsSync(fullSrc, options);

	let lowsrc = metadata.jpeg[0];
	let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

	return `<picture class="${attributes?.class || ''}">
        ${Object.values(metadata)
			.map((imageFormat) => {
				return `  <source
                    type="${imageFormat[0].sourceType}"
                    srcset="${imageFormat.map((entry) => entry.srcset).join(', ')}"
                    sizes="${attributes?.sizes || '100vw'}"
                >`;
			})
			.join('\n')}
            <img
                class="${attributes?.imageClass || ''}"
                src="${lowsrc.url}"
                width="${highsrc.width}"
                height="${highsrc.height}"
                alt="${attributes?.alt || ''}"
                loading="${attributes?.loading || 'lazy'}"
                decoding="${attributes?.decoding || 'async'}"
            >
        </picture>`;
};
