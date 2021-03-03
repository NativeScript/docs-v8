module.exports = {
	lang: 'en-US',
	title: 'NativeScript',
	description: 'NativeScript docs',

	// head: [['link', { rel: 'stylesheet', href: '/styles.css' }]],

	themeConfig: {
		repo: 'NativeScript/docs-new',
		docsDir: '.',
		logo: '/assets/images/NativeScript_Logo_Wide_White_Blue_Rounded_Blue.png',

		editLinks: true,
		editLinkText: 'Edit this page on GitHub',
		lastUpdated: 'Last Updated',

		//   algolia: {
		//     apiKey: 'xxx',
		//     indexName: 'xxx'
		//   },

		nav: [
			{
				text: 'Docs',
				link: '/introduction',
				activeMatch: '^/(?!plugins)',
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
			{
				text: 'Writing Guide',
				link: 'https://v3.vuejs.org/guide/contributing/writing-guide.html',
			},
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
			md.use(...createFlavorContainer())
			md.use(codeBlocksPlugin)
		},
	},
}

function getSidebar() {
	return [
		{
			text: 'Setup',
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
			text: 'Networking & Security',
			children: [
				{ text: 'Networking', link: '/networking' },
				{
					text: 'Security (Nathanael)',
					link: '/security',
				},
			],
		},
		{
			text: 'Performance',
			children: [{ text: 'Performance', link: '/performance' }],
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
					text: 'Common Pitfalls',
					link: '/common-pitfalls',
				},
			],
		},
	]
}

function getPluginsSidebar() {
	return [
		{
			text: 'Developing Plugins',
			link: '/plugins/developing-plugins',
		},
		{
			text: 'Official Plugins',
			children: [
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
					text: 'Local Notifications',
					link: '/plugins/local-notifications',
				},
				{
					text: 'Social Share',
					link: '/plugins/social-share',
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
      ]
    }
  ]
}

/**
 * Adds flavor containers
 *
 * For example:
 * /// flavor vue
 * ...vue specific content...
 * ///
 */
function createFlavorContainer() {
	const container = require('markdown-it-container')
	const klass = 'flavor'

	return [
		container,
		klass,
		{
			marker: '/',
			render(tokens, idx) {
				const token = tokens[idx]
				const info = token.info.trim().slice(klass.length).trim()
				if (token.nesting === 1) {
					return `<div class="${klass} ${info}">\n`
				} else {
					return `</div>\n`
				}
			},
		},
	]
}

/**
 * Adds .code-block to highlighted code blocks
 * Adds data-tab-title="<lang>" or looks for <!-- tab:CustomTabName --> comment above code block to override
 * todo:
 *   - group into tabs
 *   - implement global selector to automatically switch all tabs
 */
function codeBlocksPlugin(md) {
	const fence = md.renderer.rules.fence
	md.renderer.rules.fence = (...args) => {
		const rawCode = fence(...args)

		const [tokens, idx] = args
		const token = tokens[idx]
		const prev = idx > 0 ? tokens[idx - 1] : null
		// const next = idx < tokens.length - 1 ? tokens[idx+1] : null;
		// if(prev && prev.type === 'fence') {
		// }
		// if(next && next.type === 'fence') {
		// }

		let tabTitle = token.info
		if (prev && prev.type === 'html_block') {
			// <!-- tab:CustomTabName -->\n
			const matched = prev.content.match(/<!--\s*tab:(\w+)\s*-->/)
			if (matched) {
				tabTitle = matched[1]
			}
		}
		const finalCode = rawCode.replace(
			/"(language-\w+)"/,
			`"$1 code-block" data-tab-title="${tabTitle}"`
		)

		return finalCode
	}
}
