
const { glob } = require('glob');
const { readFileSync } = require('fs');

module.exports = function () {
	// Load all component.json files from the ./src/_includes/components/**/component.json directories
	let componentFiles = glob.sync('./src/_includes/components/**/component.json');

	if (componentFiles.length) {
		let componentHTML = componentFiles.map((file) => {
			let componentJSON = readFileSync(`./${file}`, 'utf8');
			let component = JSON.parse(componentJSON);
			let componentAssets = [];

			// Scripts
			if (component?.scripts) {
				let scripts = component.scripts.map((script) => {
					return script?.type === 'module'
						? `<script src="${script.src}" type="module"></script>`
						: `<script src="${script.src}" ${script?.defer ? 'defer' : ''} ${
								script?.async ? 'async' : ''
						  }></script>`;
				});

				componentAssets.push(scripts.join('\n'));
			}

			// Styles
			if (component?.styles) {
				let styles = component.styles.map((style) => {
					return `<link rel="stylesheet" href="${style.src}">`;
				});

				componentAssets.push(styles.join('\n'));
			}

			return componentAssets.join('\n');
		});

		return componentHTML;
	}

	return '';
};
