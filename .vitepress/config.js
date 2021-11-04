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
}

function getSidebar() {
	return [
		{
			text: 'Basics',
			children: [
				{ text: 'Introduction', link: '/introduction' },
				{ text: 'Core Tutorial', link: '/tutorial-core' },
				{ text: 'Angular Tutorial', link: '/tutorial-angular' },
				{ text: 'Vue Tutorial', link: '/tutorial-vue' },
				{
					text: 'Environment Setup',
					link: '/environment-setup',
				},
				{
					text: 'Development Workflow',
					link: '/development-workflow',
				},
				{
					text: 'Understanding @nativescript',
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
					link: '/plugins/app-availability',
				},
				{
					text: 'Apple Pay',
					link: '/plugins/apple-pay',
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
					text: 'Google Pay',
					link: '/plugins/google-pay',
				},
				{
					text: 'Image Picker',
					link: '/plugins/imagepicker',
				},
				{
					text: 'IQ Keyboard Manager',
					link: '/plugins/iq-keyboard-manager',
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
					text: 'Hidden, Visibility, v-if, ngIf, etc.',
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
					text: 'Conditional or .ios/.android file',
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
