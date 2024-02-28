const markdownit = require('markdown-it');
const unindent = require('../utils/unindent');

module.exports = function (content) {
	const md = markdownit({
		html: true,
		linkify: true,
		typographer: true,
	});
	let result = md.render(unindent(content));
	return result;
};
