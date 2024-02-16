
const fs = require('fs');

module.exports = (name, className = null) => {
	let iconSVG = fs.readFileSync(`./src/assets/icons/${name}.svg`, 'utf-8');

	// Optional Class
	if (className) {
		let classAttr = `class="${className}"`;
		iconSVG = iconSVG.replace('viewBox', `${classAttr} viewBox`);
	}

	return iconSVG;
};
