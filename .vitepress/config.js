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
				text: 'Guides',
				link: '/introduction',
				activeMatch: '^/(?!plugins)',
			},
			{
				text: 'Components',
				link: '/components/index',
				activeMatch: '^/components',
			},
			{
				text: 'API',
				link: 'https://docs.nativescript.org/api-reference',
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
				link: '/capacitor/index',
				activeMatch: '^/capacitor',
			},
			// 	{
			// 		text: 'Writing Guide',
			// 		link: 'https://v3.vuejs.org/guide/contributing/writing-guide.html',
			// 	},
		],

		sidebar: {
			'/best-practices/': getBestPracticeSidebar(),
			'/plugins/': getPluginsSidebar(),
			'/components/': getComponentsSidebar(),
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
	const officialGithubUrl =
		'https://github.com/NativeScript/plugins/tree/main/packages'

	const paymentsPlugins_baseUrl =
		'https://raw.githubusercontent.com/NativeScript/payments/main/packages'
	const paymentsGithubUrl =
		'https://github.com/NativeScript/payments/tree/main/packages'

	const firebasePlugins_baseUrl =
		'https://raw.githubusercontent.com/NativeScript/firebase/main/packages'
	const firebaseGithubUrl =
		'https://github.com/NativeScript/firebase/tree/main/packages'

	return [
		{
			category: 'Developing plugins',
			plugins: [
				{
					name: 'Getting Started',
					link: '/plugins/plugin-workspace-guide',
				},
			],
		},
		{
			category: 'Plugins',
			plugins: [
				{
					name: 'Animated Circle',
					link: '/plugins/animated-circle',
					readme: `${officialPlugins_baseUrl}/animated-circle/README.md`,
					repo: `${officialGithubUrl}/animated-circle`,
				},
				{
					name: 'App Availability',
					link: '/plugins/appavailability',
					readme: `${officialPlugins_baseUrl}/appavailability/README.md`,
					repo: `${officialGithubUrl}/appavailability`,
				},
				{
					name: 'Apple Signin',
					link: '/plugins/apple-sign-in',
					readme: `${officialPlugins_baseUrl}/apple-sign-in/README.md`,
					repo: `${officialGithubUrl}/apple-sign-in`,
				},
				{
					name: 'Auto Fit Text',
					link: '/plugins/auto-fit-text',
					readme: `${officialPlugins_baseUrl}/auto-fit-text/README.md`,
					repo: `${officialGithubUrl}/auto-fit-text`,
				},
				{
					name: 'Background HTTP',
					link: '/plugins/background-http',
					readme: `${officialPlugins_baseUrl}/background-http/README.md`,
					repo: `${officialGithubUrl}/background-http`,
				},
				{
					name: 'Biometrics',
					link: '/plugins/biometrics',
					readme: `${officialPlugins_baseUrl}/biometrics/README.md`,
					repo: `${officialGithubUrl}/biometrics`,
				},
				{
					name: 'Brightness',
					link: '/plugins/brightness',
					readme: `${officialPlugins_baseUrl}/brightness/README.md`,
					repo: `${officialGithubUrl}/brightness`,
				},
				{
					name: 'Camera',
					link: '/plugins/camera',
					readme: `${officialPlugins_baseUrl}/camera/README.md`,
					repo: `${officialGithubUrl}/camera`,
				},
				{
					name: 'Contacts',
					link: '/plugins/contacts',
					readme: `${officialPlugins_baseUrl}/contacts/README.md`,
					repo: `${officialGithubUrl}/contacts`,
				},
				{
					name: 'DateTimePicker',
					link: '/plugins/datetimepicker',
					readme: `${officialPlugins_baseUrl}/datetimepicker/README.md`,
					repo: `${officialGithubUrl}/datetimepicker`,
				},
				{
					name: 'Debug iOS',
					link: '/plugins/debug-ios',
					readme: `${officialPlugins_baseUrl}/debug-ios/README.md`,
					repo: `${officialGithubUrl}/debug-ios`,
				},
				{
					name: 'Detox',
					link: '/plugins/detox',
					readme: `${officialPlugins_baseUrl}/detox/README.md`,
					repo: `${officialGithubUrl}/detox`,
				},
				{
					name: 'Directions',
					link: '/plugins/directions',
					readme: `${officialPlugins_baseUrl}/directions/README.md`,
					repo: `${officialGithubUrl}/directions`,
				},
				{
					name: 'Email',
					link: '/plugins/email',
					readme: `${officialPlugins_baseUrl}/email/README.md`,
					repo: `${officialGithubUrl}/email`,
				},
				{
					name: 'Facebook',
					link: '/plugins/facebook',
					readme: `${officialPlugins_baseUrl}/facebook/README.md`,
					repo: `${officialGithubUrl}/facebook`,
				},
				{
					name: 'Fingerprint-Auth',
					link: '/plugins/fingerprint-auth',
					readme: `${officialPlugins_baseUrl}/fingerprint-auth/README.md`,
					repo: `${officialGithubUrl}/fingerprint-auth`,
				},
				{
					name: 'Geolocation',
					link: '/plugins/geolocation',
					readme: `${officialPlugins_baseUrl}/geolocation/README.md`,
					repo: `${officialGithubUrl}/geolocation`,
				},
				{
					name: 'Google Maps',
					link: '/plugins/google-maps',
					readme: `${officialPlugins_baseUrl}/google-maps/README.md`,
					repo: `${officialGithubUrl}/google-maps`,
				},
				{
					name: 'Google Signin',
					link: '/plugins/google-signin',
					readme: `${officialPlugins_baseUrl}/google-signin/README.md`,
					repo: `${officialGithubUrl}/google-signin`,
				},
				{
					name: 'Image Picker',
					link: '/plugins/imagepicker',
					readme: `${officialPlugins_baseUrl}/imagepicker/README.md`,
					repo: `${officialGithubUrl}/imagepicker`,
				},
				{
					name: 'Ionic Portals',
					link: '/plugins/ionic-portals',
					readme: `${officialPlugins_baseUrl}/ionic-portals/README.md`,
					repo: `${officialGithubUrl}/ionic-portals`,
				},
				{
					name: 'iOS Security',
					link: '/plugins/ios-security',
					readme: `${officialPlugins_baseUrl}/ios-security/README.md`,
					repo: `${officialGithubUrl}/ios-security`,
				},
				{
					name: 'IQ Keyboard Manager',
					link: '/plugins/iqkeyboardmanager',
					readme: `${officialPlugins_baseUrl}/iqkeyboardmanager/README.md`,
					repo: `${officialGithubUrl}/iqkeyboardmanager`,
				},
				{
					name: 'Local Notifications',
					link: '/plugins/local-notifications',
					readme: `${officialPlugins_baseUrl}/local-notifications/README.md`,
					repo: `${officialGithubUrl}/local-notifications`,
				},
				{
					name: 'Localize',
					link: '/plugins/localize',
					readme: `${officialPlugins_baseUrl}/localize/README.md`,
					repo: `${officialGithubUrl}/localize`,
				},
				{
					name: 'Picker',
					link: '/plugins/picker',
					readme: `${officialPlugins_baseUrl}/picker/README.md`,
					repo: `${officialGithubUrl}/picker`,
				},
				{
					name: 'Shared Notification Delegate',
					link: '/plugins/shared-notification-delegate',
					readme: `${officialPlugins_baseUrl}/shared-notification-delegate/README.md`,
					repo: `${officialGithubUrl}/shared-notification-delegate`,
				},
				{
					name: 'Social Share',
					link: '/plugins/social-share',
					readme: `${officialPlugins_baseUrl}/social-share/README.md`,
					repo: `${officialGithubUrl}/social-share`,
				},
				{
					name: 'Theme Switcher',
					link: '/plugins/theme-switcher',
					readme: `${officialPlugins_baseUrl}/theme-switcher/README.md`,
					repo: `${officialGithubUrl}/theme-switcher`,
				},
				{
					name: 'Twitter',
					link: '/plugins/twitter',
					readme: `${officialPlugins_baseUrl}/twitter/README.md`,
					repo: `${officialGithubUrl}/twitter`,
				},
				{
					name: 'Zip',
					link: '/plugins/zip',
					readme: `${officialPlugins_baseUrl}/zip/README.md`,
					repo: `${officialGithubUrl}/zip`,
				},
				{
					name: 'Tailwind CSS',
					link: '/plugins/tailwindcss',
					readme: `https://raw.githubusercontent.com/NativeScript/tailwind/main/README.md`,
					repo: `https://github.com/NativeScript/tailwind`,
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
					repo: `${paymentsGithubUrl}/apple-pay`,
				},
				{
					name: 'Google Pay',
					link: '/plugins/google-pay',
					readme: `${paymentsPlugins_baseUrl}/google-pay/README.md`,
					repo: `${paymentsGithubUrl}/google-pay`,
				},
				{
					name: 'Payments: IAP & Subscriptions',
					link: '/plugins/payments',
					readme: `${paymentsPlugins_baseUrl}/payments/README.md`,
					repo: `${paymentsGithubUrl}/payments`,
				},
			],
		},
		{
			category: 'Firebase',
			plugins: [
				{
					name: 'Core',
					link: '/plugins/firebase-core',
					readme: `${firebasePlugins_baseUrl}/firebase-core/README.md`,
					repo: `${firebaseGithubUrl}/firebase-core`,
				},
				{
					name: 'Admob',
					link: '/plugins/firebase-admob',
					readme: `${firebasePlugins_baseUrl}/firebase-admob/README.md`,
				},
				{
					name: 'Analytics',
					link: '/plugins/firebase-analytics',
					readme: `${firebasePlugins_baseUrl}/firebase-analytics/README.md`,
					repo: `${firebaseGithubUrl}/firebase-analytics`,
				},
				{
					name: 'App Check',
					link: '/plugins/firebase-app-check',
					readme: `${firebasePlugins_baseUrl}/firebase-app-check/README.md`,
					repo: `${firebaseGithubUrl}/firebase-app-check`,
				},
				{
					name: 'Auth',
					link: '/plugins/firebase-auth',
					readme: `${firebasePlugins_baseUrl}/firebase-auth/README.md`,
					repo: `${firebaseGithubUrl}/firebase-auth`,
				},
				{
					name: 'Crashlytics',
					link: '/plugins/firebase-crashlytics',
					readme: `${firebasePlugins_baseUrl}/firebase-crashlytics/README.md`,
					repo: `${firebaseGithubUrl}/firebase-crashlytics`,
				},
				{
					name: 'Database',
					link: '/plugins/firebase-database',
					readme: `${firebasePlugins_baseUrl}/firebase-database/README.md`,
					repo: `${firebaseGithubUrl}/firebase-database`,
				},
				{
					name: 'Dynamic Links',
					link: '/plugins/firebase-dynamic-links',
					readme: `${firebasePlugins_baseUrl}/firebase-dynamic-links/README.md`,
					repo: `${firebaseGithubUrl}/firebase-dynamic-links`,
				},
				{
					name: 'Firestore',
					link: '/plugins/firebase-firestore',
					readme: `${firebasePlugins_baseUrl}/firebase-firestore/README.md`,
					repo: `${firebaseGithubUrl}/firebase-firestore`,
				},
				{
					name: 'Functions',
					link: '/plugins/firebase-functions',
					readme: `${firebasePlugins_baseUrl}/firebase-functions/README.md`,
					repo: `${firebaseGithubUrl}/firebase-functions`,
				},
				{
					name: 'In App Messaging',
					link: '/plugins/firebase-in-app-messaging',
					readme: `${firebasePlugins_baseUrl}/firebase-in-app-messaging/README.md`,
					repo: `${firebaseGithubUrl}/firebase-in-app-messaging`,
				},
				{
					name: 'Installations',
					link: '/plugins/firebase-installations',
					readme: `${firebasePlugins_baseUrl}/firebase-installations/README.md`,
					repo: `${firebaseGithubUrl}/firebase-installations`,
				},
				{
					name: 'Messaging',
					link: '/plugins/firebase-messaging',
					readme: `${firebasePlugins_baseUrl}/firebase-messaging/README.md`,
					repo: `${firebaseGithubUrl}/firebase-messaging`,
				},
				{
					name: 'Performance',
					link: '/plugins/firebase-performance',
					readme: `${firebasePlugins_baseUrl}/firebase-performance/README.md`,
					repo: `${firebaseGithubUrl}/firebase-performance`,
				},
				{
					name: 'Remote Config',
					link: '/plugins/firebase-remote-config',
					readme: `${firebasePlugins_baseUrl}/firebase-remote-config/README.md`,
					repo: `${firebaseGithubUrl}/firebase-remote-config`,
				},
				{
					name: 'Storage',
					link: '/plugins/firebase-storage',
					readme: `${firebasePlugins_baseUrl}/firebase-storage/README.md`,
					repo: `${firebaseGithubUrl}/firebase-storage`,
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
				{ text: 'Application Architecture', link: '/application-architecture' },
				{ text: 'Project Structure', link: '/project-structure' },
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
				{
					text: 'Tutorials',
					link: '/tutorial/',
				},
			],
		},
		{
			text: 'App_Resources',
			children: [
				{
					text: 'Understanding App_Resources',
					link: '/app-resources',
				},
			],
		},
		{
			text: 'UI',
			children: [
				{
					text: 'Components',
					link: '/ui/components',
				},
				{
					text: 'Styling',
					link: '/ui/styling',
				},
				{ text: 'Interaction', link: '/ui/interaction' },
			],
		},
		{
			text: '@nativescript/core',
			children: [
				{ text: 'Application', link: '/nativescript-core/application' },
				{
					text: 'ApplicationSettings',
					link: '/nativescript-core/application-settings',
				},
				{ text: 'Color', link: '/nativescript-core/color' },
				{ text: 'Connectivity', link: '/nativescript-core/connectivity' },
				//{ text: 'Virtual Array', link: '/nativescript-core/virtual-array' },
				{ text: 'FileSystem', link: '/nativescript-core/file-system' },
				//{ text: 'Fps Meter', link: '/nativescript-core/fps-meter' },
				{ text: 'Http', link: '/nativescript-core/http' },
				{ text: 'ImageSource', link: '/nativescript-core/image-source' },
				{ text: 'Observable', link: '/nativescript-core/observable' },
				{
					text: 'Observable Array',
					link: '/nativescript-core/observable-array',
				},
				{ text: 'Platform', link: '/nativescript-core/platform' },
				{ text: 'Trace', link: '/nativescript-core/trace' },
				{ text: 'Utils', link: '/nativescript-core/utils' },
				{ text: 'Xml Parser', link: '/nativescript-core/xml-parser' },
			],
		},
		{
			text: '@nativescript/webpack',
			children: [
				{
					text: 'Overview',
					link: 'webpack/overview',
				},
				{
					text: 'Flags & their usage',
					link: 'webpack/flags-and-their-usage',
				},

				{
					text: 'Using .env files',
					link: 'webpack/using-dot-env-files',
				},
				{
					text: 'Global "magic" variables',
					link: 'webpack/global-magic-variables',
				},
				{
					text: 'Examples of configurations',
					link: 'webpack/examples-of-configurations',
				},
				{
					text: 'Plugin API',
					link: 'webpack/plugin-api',
				},
				{
					text: 'Webpack API',
					link: 'webpack/api',
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
			text: 'Architecture Concepts',
			children: [
				{
					text: 'Data Binding',
					link: '/architecture-concepts/data-binding',
				},
				{
					text: 'Adding Objective C/Swift Code',
					link: '/architecture-concepts/adding-objectivec-swift-code',
				},
				{ text: 'Navigation', link: '/architecture-concepts/navigation' },
				{
					text: 'Marshalling',
					link: '/architecture-concepts/marshalling',
				},
				{
					text: 'Metadata',
					link: '/architecture-concepts/metadata',
				},
				{
					text: 'Memory Management',
					link: '/architecture-concepts/memory-management',
				},
				{
					text: 'Custom Application and Activity',
					link: '/architecture-concepts/custom-application-and-activity',
				},
				/*{
					text: 'Layout Process',
					link: '/advanced-concepts',
				},*/
				{
					text: 'Property System',
					link: '/architecture-concepts/property-system',
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

function getComponentsSidebar() {
	return [
		{
			text: 'Components',
			children: [
				{
					text: 'ActionBar',
					link: '/components/actionbar',
				},
			],
		},
	]
}
