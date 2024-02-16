
const getFilesFromDirectory = require('../utils/getListOfFilesFromDirectory');
const fs = require('fs');

/**
 * Take a string (a directory path) and return an array of files in that directory.
 * Accepts a glob.
 *
 * @param {string} input - The directory path
 * @returns {Array} - An array of file paths
 *
 * Usage:
 * {% set gallery = "./src/assets/images/*.jpg" | glob %}
 *
 * You can use a for loop to loop through the gallery array and display the images.
 */
module.exports = async function (input) {
	return await getFilesFromDirectory(input);
};
