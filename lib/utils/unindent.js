module.exports = function unindent(content) {
	let strings = content.split('\n');

	// Find the smallest indentation across all lines
	const minIndent = strings.reduce((min, line) => {
		const currentIndent = line.match(/^(\s*)/)[0].length;
		if (line.trim() && currentIndent < min) {
			return currentIndent;
		}
		return min;
	}, Infinity);

	// Remove the found indentation from all lines
	return strings.map((line) => line.slice(minIndent)).join('\n');
};
