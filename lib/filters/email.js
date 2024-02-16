
/**
 * Reverse an Email address to help prevent spam
 * Visually, it's written correctly but the string is reversed
 * to help prevent spam.
 *
 * @param {string} input
 * @returns {string}
 */
module.exports = (input) => {
	let reverseEmailAddress = input.split('').reverse().join('');
	return `<email-address style="unicode-bidi: bidi-override; direction: rtl;">${reverseEmailAddress}</email-address>`;
};
