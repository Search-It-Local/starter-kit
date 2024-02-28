module.exports = (input, limit) => {
	if (input.length === limit) {
		return input;
	}

	return input.slice(0, limit);
};
