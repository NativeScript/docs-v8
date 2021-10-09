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
	const firebasePlugins_baseUrl =
		'https://raw.githubusercontent.com/NativeScript/firebase/main/packages'

	return [
		{
			category: 'Plugins',
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
					name: 'Facebook',
					link: '/plugins/facebook',
					readme: `${officialPlugins_baseUrl}/facebook/README.md`,
				},
				{
					name: 'Fingerprint-Auth',
					link: '/plugins/fingerprint-auth',
					readme: `${officialPlugins_baseUrl}/fingerprint-auth/README.md`,
				},
				{
					name: 'Google Signin',
					link: '/plugins/google-signin',
					readme: `${officialPlugins_baseUrl}/google-signin/README.md`,
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
					name: 'Twitter',
					link: '/plugins/twitter',
					readme: `${officialPlugins_baseUrl}/twitter/README.md`,
				},
				{
					name: 'Zip',
					link: '/plugins/zip',
					readme: `${officialPlugins_baseUrl}/zip/README.md`,
				},
			],
		},
		{
			category: 'Payments',
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
					name: 'Payments: IAP & Subscriptions',
					link: '/plugins/payments',
					readme: `${paymentsPlugins_baseUrl}/payments/README.md`,
				},
			],
		},
		{
			category: 'Firebase',
			plugins: [
				{
					name: 'Admob',
					link: '/plugins/firebase-admob',
					readme: `${firebasePlugins_baseUrl}/firebase-admob/README.md`,
				},
				{
					name: 'Analytics',
					link: '/plugins/firebase-analytics',
					readme: `${firebasePlugins_baseUrl}/firebase-analytics/README.md`,
				},
				{
					name: 'App Check',
					link: '/plugins/firebase-app-check',
					readme: `${firebasePlugins_baseUrl}/firebase-app-check/README.md`,
				},
				{
					name: 'Auth',
					link: '/plugins/firebase-auth',
					readme: `${firebasePlugins_baseUrl}/firebase-auth/README.md`,
				},
				{
					name: 'Core',
					link: '/plugins/firebase-core',
					readme: `${firebasePlugins_baseUrl}/firebase-core/README.md`,
				},
				{
					name: 'Crashlytics',
					link: '/plugins/firebase-crashlytics',
					readme: `${firebasePlugins_baseUrl}/firebase-crashlytics/README.md`,
				},
				{
					name: 'Database',
					link: '/plugins/firebase-database',
					readme: `${firebasePlugins_baseUrl}/firebase-database/README.md`,
				},
				{
					name: 'Dynamic Links',
					link: '/plugins/firebase-dynamic-links',
					readme: `${firebasePlugins_baseUrl}/firebase-dynamic-links/README.md`,
				},
				{
					name: 'Firestore',
					link: '/plugins/firebase-firestore',
					readme: `${firebasePlugins_baseUrl}/firebase-firestore/README.md`,
				},
				{
					name: 'Functions',
					link: '/plugins/firebase-functions',
					readme: `${firebasePlugins_baseUrl}/firebase-functions/README.md`,
				},
				{
					name: 'In App Messaging',
					link: '/plugins/firebase-in-app-messaging',
					readme: `${firebasePlugins_baseUrl}/firebase-in-app-messaging/README.md`,
				},
				{
					name: 'Insallations',
					link: '/plugins/firebase-installations',
					readme: `${firebasePlugins_baseUrl}/firebase-installations/README.md`,
				},
				{
					name: 'Messaging',
					link: '/plugins/firebase-messaging',
					readme: `${firebasePlugins_baseUrl}/firebase-messaging/README.md`,
				},
				{
					name: 'Performance',
					link: '/plugins/firebase-performance',
					readme: `${firebasePlugins_baseUrl}/firebase-performance/README.md`,
				},
				{
					name: 'Remote Config',
					link: '/plugins/firebase-remote-config',
					readme: `${firebasePlugins_baseUrl}/firebase-remote-config/README.md`,
				},
				{
					name: 'Storage',
					link: '/plugins/firebase-storage',
					readme: `${firebasePlugins_baseUrl}/firebase-storage/README.md`,
				},
			],
		},
		{
			category: 'Extras',
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
