const _ = require('lodash');
const plugin = require('tailwindcss/plugin');
const postcss = require('postcss');
const postcssJs = require('postcss-js');
const theme = require('./theme');

/**
 * To add values specific to this project, you should add them
 * in theme.js. This file is for default values that are not
 * specific to this project.
 */
const defaults = {
	colors: {
		current: 'currentColor',
		inherit: 'inherit',
		transparent: 'transparent',
		...theme.color,
	},
	fontSize: {
		xs: 'clamp(0.65rem, 0.5859rem + 0.2735vw, 0.75rem)',
		sm: 'clamp(0.75rem, 0.6987rem + 0.2188vw, 0.83rem)',
		base: 'clamp(0.75rem, 0.5897rem + 0.6838vw, 1rem)',
		lg: 'clamp(0.83rem, 0.5928rem + 1.012vw, 1.2rem)',
		xl: 'clamp(1rem, 0.7179rem + 1.2034vw, 1.44rem)',
		'2xl': 'clamp(1.2rem, 0.8615rem + 1.4441vw, 1.728rem)',
		'3xl': 'clamp(1.44rem, 1.0336rem + 1.734vw, 2.074rem)',
		'4xl': 'clamp(1.728rem, 1.2408rem + 2.0786vw, 2.488rem)',
		'5xl': 'clamp(2.074rem, 1.4894rem + 2.4944vw, 2.986rem)',
		'6xl': 'clamp(2.986rem, 2.5658rem + 1.7927vw, 4rem)',
	},
	fontFamily: theme.fontFamily,
	fontWeight: theme.fontWeight,
	lineHeight: {
		none: 1,
		tight: 1.1,
		base: 1.65,
		loose: 1.9,
		...theme.lineHeight,
	},
	screens: {
		sm: '600px',
		md: '768px',
		lg: '900px',
		xl: '1140px',
		'2xl': '1280px',
		...theme.screens,
	},
	spacing: {
		0: '0rem',
		1: '0.25rem',
		2: '0.5rem',
		3: '0.75rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		8: '2rem',
		10: '2.5rem',
		12: '3rem',
		16: '4rem',
		20: '5rem',
		24: '6rem',
		28: '7rem',
		32: '8rem',
		40: '10rem',
		48: '12rem',
		56: '14rem',
		64: '16rem',
		80: '20rem',
		96: '24rem',
		xxs: 'clamp(0.3rem, 0.1757rem + 0.5304vw, 0.6rem)',
		xs: 'clamp(0.5rem, 0.3397rem + 0.6838vw, 0.75rem)',
		sm: 'clamp(0.75rem, 0.5428rem + 0.884vw, 1.25rem)',
		md: 'clamp(1rem, 0.5856rem + 1.768vw, 2rem)',
		lg: 'clamp(1.5rem, 0.8785rem + 2.6519vw, 3rem)',
		xl: 'clamp(2rem, 1.1713rem + 3.5359vw, 4rem)',
		'2xl': 'clamp(2.5rem, 1.4641rem + 4.4199vw, 5rem)',
		'3xl': 'clamp(3rem, 1.7569rem + 5.3039vw, 6rem)',
		container: 'max(2rem, 8vw)',
		content: 'clamp(3rem, 1.3974rem + 6.8376vw, 5.5rem)',
		...theme.spacing,
	},
};

const themeConfig = _.merge(defaults, theme);

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/**/*.{njk,js,html,md,webc}'],
	theme: themeConfig,
	// Disables Tailwind's reset and usage of rgb/opacity
	corePlugins: {
		preflight: false,
		textOpacity: false,
		backgroundOpacity: false,
		borderOpacity: false,
	},

	// Prevents Tailwind's core components
	blocklist: ['container'],

	plugins: [
		plugin(function ({ addUtilities, config, e }) {
			const flowSpaceUtilities = _.map(config('theme.spacing'), (value, key) => {
				return {
					[`.${e(`flow-space-${key}`)} > *`]: {
						'--flow-space': `${value}`,
					},
				};
			});

			addUtilities(flowSpaceUtilities);
		}),
		plugin(function ({ addComponents, config }) {
			let result = '';

			const currentConfig = config();

			const groups = [
				{ key: 'borderRadius', prefix: 'rounded' },
				{ key: 'boxShadow', prefix: 'shadow' },
				{ key: 'colors', prefix: 'color' },
				{ key: 'spacing', prefix: 'space' },
				{ key: 'fontSize', prefix: 'text' },
				{ key: 'lineHeight', prefix: 'leading' },
				{ key: 'letterSpacing', prefix: 'tracking' },
				{ key: 'fontFamily', prefix: 'font' },
				{ key: 'fontWeight', prefix: 'font' },
			];

			groups.forEach(({ key, prefix }) => {
				const group = currentConfig.theme[key];

				if (!group) {
					return;
				}

				Object.keys(group).forEach((key) => {
					let propertyKey = key === 'DEFAULT' ? `--${prefix}` : `--${prefix}-${key.toLowerCase()}`;

					result += `${propertyKey}: ${group[key]};`;
				});
			});

			addComponents({
				':root': postcssJs.objectify(postcss.parse(result)),
			});
		}),
	],
};
