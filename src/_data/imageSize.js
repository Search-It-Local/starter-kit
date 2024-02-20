const tailwindConfig = require('../../tailwind.config.js');

// Loop over the screen sizes object and create a media query for each one in the format of (min-width: 640px) 640w
const screens = {};
Object.entries(tailwindConfig.theme.screens).forEach(([key, value]) => {
	screens[key] = `(min-width: ${value}) ${value.replace('px', '') * 2}px`;
});

// All screens
screens.all = Object.values(screens).join(', ');

module.exports = screens;
