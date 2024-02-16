
const fs = require('fs');

module.exports = async ({ results }) => {
	if (results.length) {
		results.forEach((result) => {
			// Skip if the output is not an HTML file
			if (!result.outputPath.endsWith('.html')) {
				return;
			}

			let customElements = [];

			customElements.push(findCustomElements(result.content));

			// Flatten the array
			let flattenedElements = customElements.flat();

			// Remove duplicates
			let uniqueElements = [...new Set(flattenedElements)];

			// Remove null values
			let filteredElements = uniqueElements.filter((element) => element !== null);

			// Remove the < from the beginning of the element names
			let elementNames = filteredElements.map((element) => element.substr(1));

			// If we have custom elements, open up the output file and add the script tags
			if (elementNames.length) {
				let outputFilePath = result.outputPath;

				fs.readFile(outputFilePath, 'utf8', (err, data) => {
					if (err) {
						console.error(err);
						return;
					}

					// Add the script tag for each custom element
					let newData = data.replace(
						'<!-- CustomElementScripts -->',
						elementNames
							.map((element) => `<script src="/assets/js/${element}.wc.js" type="module"></script>`)
							.join('\n')
					);

					fs.writeFile(outputFilePath, newData, 'utf8', (err) => {
						if (err) {
							console.error(err);
							return;
						}
					});
				});
			}
		});
	}
};

function findCustomElements(html) {
	// Regular expression to match custom element names
	const regexPattern = /<([a-z0-9]+-[a-z0-9-]*)(?![^<>]*no-load)/g;

	// Find all matches in the HTML content
	return html.match(regexPattern);
}
