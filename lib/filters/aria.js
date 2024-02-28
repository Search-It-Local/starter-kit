const jsdom = require('jsdom');
const _ = require('lodash');
const { JSDOM } = jsdom;

module.exports = function (input, elements = {}) {
	console.log(elements);
	// If elements is empty, just return the original input
	if (elements.length < 1) {
		return input;
	}

	const html = new JSDOM(input);

	// Loop over each element, find it in the DOM and add an ID
	_.forEach(elements, (id, element) => {
		const el = html.window.document.querySelector(element);
		if (el) {
			el.id = id;
		}
	});

	return html.window.document.body.innerHTML;
};
