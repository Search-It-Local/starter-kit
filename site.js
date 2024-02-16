module.exports = {
	/**
	 * Site name, useful for page titles
	 */
	name: `11ty Starter`,

	/**
	 * Site URL, we use this in the Sitemap
	 */
	url: `http://localhost:8080`,

	/**
	 * Google Tag Manager ID
	 */
	googleTagManagerID: 'GTM-XXXXX',

	/**
	 * Menus
	 */
	menus: {
		main: [
			{ label: 'Home', href: '/' },
			{
				label: 'Services',
				href: '/services/',
				children: [
					{ label: 'Service 1', href: '/' },
					{ label: 'Service 2', href: '/' },
					{ label: 'Service 3', href: '/' },
				],
			},
			{ label: 'External Link', href: '/', target: '_blank' },
			{ label: 'Contact', href: '/contact/' },
		],
	},

	/**
	 * Company Information
	 */
	email: `info@resknow.co.uk`,
	phone: '0208 300 8833',
	address: '13 St Johns Parade, Sidcup, Kent, DA14 6ES',
	location: {
		lat: `51.42492021179657`,
		lng: `0.10547518730163574`,
	},

	/**
	 * Opening Times
	 */
	openingTimes: [
		{ day: 'mon', times: '09:00 - 17:00' },
		{ day: 'tue', times: '09:00 - 17:00' },
		{ day: 'wed', times: '09:00 - 17:00' },
		{ day: 'thu', times: '09:00 - 17:00' },
		{ day: 'fri', times: '09:00 - 17:00' },
		{ day: 'sat', times: 'Closed' },
		{ day: 'sun', times: 'Closed' },
	],

	/**
	 * Cookie Consent
	 *
	 * A small banner will appear in the bottom left of the
	 * page letting the user know this site uses cookies
	 * to provide the best experience.
	 */
	cookieConsent: {
		show: true,
		text: 'We use cookies to provide the best experience.',
	},
};
