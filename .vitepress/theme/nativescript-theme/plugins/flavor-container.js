'use strict'
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, '__esModule', { value: true })
exports.wrapFlavorContainersInTabs = exports.markFlavorHeadings = exports.createFlavorContainer = void 0
const token_1 = __importDefault(require('markdown-it/lib/token'))
/**
 * Adds flavor containers
 *
 * For example:
 * /// flavor vue
 * ...vue specific content...
 * ///
 */
const container = require('markdown-it-container')
const klass = 'flavor'
function createFlavorContainer() {
	return [
		container,
		klass,
		{
			marker: '/',
			render(tokens, idx) {
				const token = tokens[idx]
				const info = token.info.trim().slice(klass.length).trim()
				if (token.nesting === 1) {
					return `<div class="${klass} ${info}" data-tab-title="${info}">\n`
				} else {
					return `</div>\n`
				}
			},
		},
	]
}
exports.createFlavorContainer = createFlavorContainer
/**
 * Adds flavor classes to headings
 *
 * Adds flavor to headings array used in sidebars
 */
function markFlavorHeadings(md) {
	const renderHeadingOpen = md.renderer.rules['heading_open']
	const renderContainerFlavorOpen = md.renderer.rules['container_flavor_open']
	const renderContainerFlavorClose = md.renderer.rules['container_flavor_close']
	let currentFlavor = null
	md.renderer.rules['container_flavor_open'] = function (
		tokens,
		idx,
		options,
		env,
		renderer
	) {
		const info = tokens[idx].info.trim().slice(klass.length).trim()
		currentFlavor = info
		return renderContainerFlavorOpen(tokens, idx, options, env, renderer)
	}
	md.renderer.rules['container_flavor_close'] = function (
		tokens,
		idx,
		options,
		env,
		renderer
	) {
		currentFlavor = null
		return renderContainerFlavorClose(tokens, idx, options, env, renderer)
	}
	md.renderer.rules['heading_open'] = function (
		tokens,
		idx,
		options,
		env,
		renderer
	) {
		if (currentFlavor) {
			const token = tokens[idx]
			token.attrJoin('class', currentFlavor)
			// render now to apply other plugins like vitepress headings
			const rendered = renderHeadingOpen(tokens, idx, options, env, renderer)
			// update headings data afterwards
			const idAttr = token.attrs.find(([name]) => name === 'id')
			const slug = idAttr && idAttr[1]
			const headers = md.__data.headers
			if (headers) {
				const header = headers.find((h) => h.slug === slug)
				if (header) {
					header.flavor = currentFlavor
				}
			}
			return rendered
		}
		return renderHeadingOpen(tokens, idx, options, env, renderer)
	}
}
exports.markFlavorHeadings = markFlavorHeadings
function wrapFlavorContainersInTabs(md) {
	const process = md.core.process.bind(md.core)
	md.core.process = function (state) {
		process(state)
		processFlavorContainers(state)
		return state
	}
}
exports.wrapFlavorContainersInTabs = wrapFlavorContainersInTabs
function processFlavorContainers(state) {
	const OPEN_TYPE = 'container_flavor_open'
	const CLOSE_TYPE = 'container_flavor_close'
	const DEBUG = false
	const tokens = state.tokens
	let lastTokenType
	let groupStart
	let groups = []
	for (let idx = 0; idx < tokens.length; idx++) {
		const token = tokens[idx]
		DEBUG &&
			console.log(`${idx} | ${token.type} (LAST TYPE = ${lastTokenType})`)
		if (lastTokenType === CLOSE_TYPE && token.type !== OPEN_TYPE) {
			// close group
			groups.push({ start: groupStart, end: idx - 1 })
			groupStart = undefined
			lastTokenType = undefined
			DEBUG && console.log(`CLOSE GROUP | `, groups[groups.length - 1])
		}
		if (!(token.type === OPEN_TYPE || token.type === CLOSE_TYPE)) {
			DEBUG && console.log('SKIP')
			continue
		}
		if (token.type === OPEN_TYPE) {
			DEBUG && console.log('OPEN')
			if (groupStart === undefined) {
				DEBUG && console.log('OPEN GROUP')
				groupStart = idx
			}
		}
		if (token.type === CLOSE_TYPE) {
			DEBUG && console.log('CLOSE')
		}
		lastTokenType = token.type
	}
	// insert wrapping tokens
	let idxOffset = 0
	groups.forEach((group) => {
		const start = group.start + idxOffset
		const start_token = new token_1.default(
			'flavor_group_start',
			'FlavorTabs',
			1
		)
		state.tokens.splice(start, 0, start_token)
		idxOffset++
		const end = group.end + 1 + idxOffset
		const end_token = new token_1.default('flavor_group_end', 'FlavorTabs', -1)
		state.tokens.splice(end, 0, end_token)
		idxOffset++
	})
}
