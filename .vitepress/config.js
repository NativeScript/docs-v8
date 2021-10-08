const {
	createFlavorContainer,
	codeBlocksPlugin,
	markFlavorHeadings,
	wrapFlavorContainersInTabs,
	setupPrismCLILang,
	createDeviceFrameContainer,
} = require('./theme/nativescript-theme/plugins')

setupPrismCLILang()

module.exports = {
	lang: 'en-US',
	title: 'NativeScript',
	description: 'NativeScript docs',

	head: [
		['link', { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }],
		['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com' }],

		[
			'link',
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: 'https://nativescript.org/apple-touch-icon.png',
			},
		],
		[
			'link',
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: 'https://nativescript.org/favicon-32x32.png',
			},
		],
		[
			'link',
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: 'https://nativescript.org/favicon-16x16.png',
			},
		],
		[
			'link',
			{ rel: 'manifest', href: 'https://nativescript.org/site.webmanifest' },
		],
	],

	themeConfig: {
		repo: 'NativeScript/docs-new',
		docsDir: '.',
		logo: '/assets/images/NativeScript_Logo_Wide_White_Blue_Rounded_Blue.png',

		mainURL: 'https://nativescript.org',

		editLinks: true,
		editLinkText: 'Edit this page on GitHub',
		lastUpdated: 'Last Updated',

		algolia: {
			apiKey: '8d41b4ae92a02aea355e1dc8cfad1899',
			indexName: 'nativescript',
		},

		nav: [
			{
				text: 'Docs',
				link: '/introduction',
				activeMatch: '^/(?!plugins)',
			},
			{
				text: 'API',
				link: '/api-reference',
				activeMatch: '^/api-reference',
				target: '_blank',
			},
			{
				text: 'Plugins',
				link: '/plugins/index',
				activeMatch: '^/plugins',
			},
			{
				text: 'Best Practices',
				link: '/best-practices/index',
				activeMatch: '^/best-practices',
			},
			{
				text: 'Capacitor',
				link: 'https://capacitor.nativescript.org',
			},
			// 	{
			// 		text: 'Writing Guide',
			// 		link: 'https://v3.vuejs.org/guide/contributing/writing-guide.html',
			// 	},
		],

		sidebar: {
			'/best-practices/': getBestPracticeSidebar(),
			'/plugins/': getPluginsSidebar(),

			// fallback
			'/': getSidebar(),
		},
	},

	markdown: {
		config: (md) => {
			// Flavor related
			md.use(...createFlavorContainer())
			md.use(markFlavorHeadings)
			md.use(wrapFlavorContainersInTabs)

			// DeviceFrame related
			md.use(...createDeviceFrameContainer())

			// other.
			md.use(codeBlocksPlugin)
		},
	},

	plugins: getPlugins(),
}

function getPlugins() {
	const officialPlugins_baseUrl =
		'https://raw.githubusercontent.com/NativeScript/plugins/main/packages'
	const paymentsPlugins_baseUrl =
		'https://raw.githubusercontent.com/NativeScript/payments/main/packages'

	return [
		{
			category: 'Official Plugins',
			plugins: [
				{
					name: 'Animated Circle',
					link: '/plugins/animated-circle',
					readme: `${officialPlugins_baseUrl}/animated-circle/README.md`,
				},
				{
					name: 'App Availability',
					link: '/plugins/appavailability',
					readme: `${officialPlugins_baseUrl}/appavailability/README.md`,
				},
				{
					name: 'Auto Fit Text',
					link: '/plugins/auto-fit-text',
					readme: `${officialPlugins_baseUrl}/auto-fit-text/README.md`,
				},
				{
					name: 'Background HTTP',
					link: '/plugins/background-http',
					readme: `${officialPlugins_baseUrl}/background-http/README.md`,
				},
				{
					name: 'Brightness',
					link: '/plugins/brightness',
					readme: `${officialPlugins_baseUrl}/brightness/README.md`,
				},
				{
					name: 'Camera',
					link: '/plugins/camera',
					readme: `${officialPlugins_baseUrl}/camera/README.md`,
				},
				{
					name: 'DateTimePicker',
					link: '/plugins/datetimepicker',
					readme: `${officialPlugins_baseUrl}/datetimepicker/README.md`,
				},
				{
					name: 'Debug iOS',
					link: '/plugins/debug-ios',
					readme: `${officialPlugins_baseUrl}/debug-ios/README.md`,
				},
				{
					name: 'Detox',
					link: '/plugins/detox',
					readme: `${officialPlugins_baseUrl}/detox/README.md`,
				},
				{
					name: 'Directions',
					link: '/plugins/directions',
					readme: `${officialPlugins_baseUrl}/directions/README.md`,
				},
				{
					name: 'Email',
					link: '/plugins/email',
					readme: `${officialPlugins_baseUrl}/email/README.md`,
				},
				{
					name: 'Fingerprint-Auth',
					link: '/plugins/fingerprint-auth',
					readme: `${officialPlugins_baseUrl}/fingerprint-auth/README.md`,
				},
				{
					name: 'Geolocation',
					link: '/plugins/geolocation',
					readme: `${officialPlugins_baseUrl}/geolocation/README.md`,
				},
				{
					name: 'Image Picker',
					link: '/plugins/imagepicker',
					readme: `${officialPlugins_baseUrl}/imagepicker/README.md`,
				},
				{
					name: 'IQ Keyboard Manager',
					link: '/plugins/iqkeyboardmanager',
					readme: `${officialPlugins_baseUrl}/iqkeyboardmanager/README.md`,
				},
				{
					name: 'Local Notifications',
					link: '/plugins/local-notifications',
					readme: `${officialPlugins_baseUrl}/local-notifications/README.md`,
				},
				{
					name: 'Localize',
					link: '/plugins/localize',
					readme: `${officialPlugins_baseUrl}/localize/README.md`,
				},
				{
					name: 'Picker',
					link: '/plugins/picker',
					readme: `${officialPlugins_baseUrl}/picker/README.md`,
				},
				{
					name: 'Shared Notification Delegate',
					link: '/plugins/shared-notification-delegate',
					readme: `${officialPlugins_baseUrl}/shared-notification-delegate/README.md`,
				},
				{
					name: 'Social Share',
					link: '/plugins/social-share',
					readme: `${officialPlugins_baseUrl}/social-share/README.md`,
				},
				{
					name: 'Zip',
					link: '/plugins/zip',
					readme: `${officialPlugins_baseUrl}/zip/README.md`,
				},
			],
		},
		{
			category: 'Payment Plugins',
			plugins: [
				{
					name: 'Apple Pay',
					link: '/plugins/apple-pay',
					readme: `${paymentsPlugins_baseUrl}/apple-pay/README.md`,
				},
				{
					name: 'Google Pay',
					link: '/plugins/google-pay',
					readme: `${paymentsPlugins_baseUrl}/google-pay/README.md`,
				},
				{
					name: 'Payments - In App Purchases',
					link: '/plugins/payments',
					readme: `${paymentsPlugins_baseUrl}/payments/README.md`,
				},
			],
		},
		{
			category: 'NativeScript UI Plugins',
			plugins: [
				{
					name: 'NativeScript UI ListView',
					link: '/plugins/nativescript-ui/rad-list-view',
				},
			],
		},
	]
}

function getSidebar() {
	return [
		{
			text: 'Basics',
			children: [
				{ text: 'Introduction', link: '/introduction' },
				{
					text: 'Environment Setup',
					link: '/environment-setup',
				},
				{
					text: 'Development Workflow',
					link: '/development-workflow',
				},
				{
					text: '@nativescript',
					link: '/understanding-packages',
				},
			],
		},
		{
			text: 'Running & Building',
			children: [
				{
					text: 'Webpack',
					link: '/webpack',
				},
			],
		},
		{
			text: 'UI & Styling',
			children: [
				{
					text: 'UI & Styling',
					link: '/ui-and-styling',
				},
				{ text: 'Interaction', link: '/interaction' },
			],
		},
		{
			text: 'Networking',
			children: [
				{ text: 'Http', link: '/Http' },
				{
					text: 'Connectivity',
					link: '/connectivity',
				},
			],
		},
		// {
		// 	text: 'Performance',
		// 	children: [{ text: 'Webpack/Bundle Optimizations', link: '/performance' }],
		// },
		{
			text: 'Scalability',
			children: [{ text: 'Code Sharing', link: '/code-sharing/index.html' }],
		},
		{
			text: 'Native API Access',
			children: [
				{
					text: 'How to access and use',
					link: '/native-api-access',
				},
			],
		},
		{
			text: 'Advanced Concepts',
			children: [
				{
					text: 'Advanced Concepts',
					link: '/advanced-concepts',
				},
			],
		},
		{
			text: 'Distribution',
			children: [
				{
					text: 'Releasing your app',
					link: '/releasing',
				},
			],
		},
		{
			text: 'Troubleshooting',
			children: [
				{
					text: 'Common Issues',
					link: '/troubleshooting',
				},
			],
		},
	]
}

function getPluginsSidebar() {
	const plugins = getPlugins()

	return plugins.map((category) => {
		return {
			text: category.category,
			children: category.plugins.map((plugin) => ({
				text: plugin.name,
				link: plugin.link,
			})),
		}
	})

	return [
		// {
		// 	text: 'Developing Plugins',
		// 	link: '/plugins/developing-plugins',
		// },
		{
			text: 'Official Plugins',
			children: [
				{
					text: 'Animated Circle',
					link: '/plugins/animated-circle',
				},
				{
					text: 'App Availability',
					link: '/plugins/appavailability',
				},
				{
					text: 'Auto Fit Text',
					link: '/plugins/auto-fit-text',
				},
				{
					text: 'Background HTTP',
					link: '/plugins/background-http',
				},
				{
					text: 'Brightness',
					link: '/plugins/brightness',
				},
				{ text: 'Camera', link: '/plugins/camera' },
				{
					text: 'DateTimePicker',
					link: '/plugins/datetimepicker',
				},
				{
					text: 'Debug iOS',
					link: '/plugins/debug-ios',
				},
				{
					text: 'Detox',
					link: '/plugins/detox',
				},
				{
					text: 'Directions',
					link: '/plugins/directions',
				},
				{ text: 'Email', link: '/plugins/email' },
				{
					text: 'Fingerprint-Auth',
					link: '/plugins/fingerprint-auth',
				},
				{
					text: 'Geolocation',
					link: '/plugins/geolocation',
				},
				{
					text: 'Image Picker',
					link: '/plugins/imagepicker',
				},
				{
					text: 'IQ Keyboard Manager',
					link: '/plugins/iqkeyboardmanager',
				},
				{
					text: 'Local Notifications',
					link: '/plugins/local-notifications',
				},
				{
					text: 'Localize',
					link: '/plugins/localize',
				},
				{
					text: 'Picker',
					link: '/plugins/picker',
				},
				{
					text: 'Shared Notification Delegate',
					link: '/plugins/shared-notification-delegate',
				},
				{
					text: 'Social Share',
					link: '/plugins/social-share',
				},
				{
					text: 'Zip',
					link: '/plugins/zip',
				},
			],
		},
		{
			text: 'Payment Plugins',
			children: [
				{
					text: 'Apple Pay',
					link: '/plugins/apple-pay',
				},
				{
					text: 'Google Pay',
					link: '/plugins/google-pay',
				},
				{
					text: 'Payments - In App Purchases',
					link: '/plugins/payments',
				},
			],
		},
		{
			text: 'NativeScript UI Plugins',
			children: [
				{
					text: 'NativeScript-UI-ListView',
					link: '/plugins/nativescript-ui/rad-list-view',
				},
			],
		},
	]
}

function getBestPracticeSidebar() {
	return [
		{
			text: 'Best Practices',
			children: [
				{
					text: 'Introduction',
					link: '/best-practices/index',
				},
				{
					text: 'View Bindings',
					link: '/best-practices/view-bindings',
				},
				{
					text: 'ListViews',
					link: '/best-practices/listviews',
				},
				{
					text: 'Hidden/Visibility/if',
					link: '/best-practices/if-things',
				},
				{
					text: 'Rogue Timers',
					link: '/best-practices/rogue-timers',
				},
				{
					text: '@NativeClass() decorator',
					link: '/best-practices/native-class',
				},
				{
					text: 'Android',
					link: '/best-practices/android-tips',
				},
				{
					text: 'iOS',
					link: '/best-practices/ios-tips',
				},
				{
					text: 'file.{ios,android}?',
					link: '/best-practices/platform-file-split-or-not',
				},
				{
					text: 'Optimizing Images',
					link: '/best-practices/optimizing-images',
				},
			],
		},
	]
}
