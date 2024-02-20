
const { twMerge } = require('tailwind-merge');

module.exports = (classes) => {
	// If we get an array, make it a string
	if (Array.isArray(classes)) {
		classes = classes.join(' ');
	}

	let mergedClasses = twMerge(classes);

	return mergedClasses;
};
