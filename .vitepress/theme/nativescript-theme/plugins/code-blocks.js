'use strict'
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, '__esModule', { value: true })
exports.codeBlocksPlugin = void 0
const token_1 = __importDefault(require('markdown-it/lib/token'))
function processFenceContainers(state) {
	const FENCE = 'fence'
	const DEBUG = false
	const tokens = state.tokens
	let lastTokenType
	let groupStart
	let groups = []
	for (let idx = 0; idx < tokens.length; idx++) {
		const token = tokens[idx]
		DEBUG &&
			console.log(`${idx} | ${token.type} (LAST TYPE = ${lastTokenType})`)
		if (groupStart !== undefined && idx === tokens.length - 1) {
			DEBUG && console.log('CLOSE GROUP EOF')
			groups.push({ start: groupStart, end: idx })
			continue
		}
		if (token.type === 'html_block' && getTabName(token)) {
			if (groupStart === undefined) {
				DEBUG && console.log('OPEN GROUP WITH TAB NAME')
				groupStart = idx
			}
			DEBUG && console.log('SKIP TAB NAME')
			continue
		}
		if (lastTokenType === FENCE && token.type !== FENCE) {
			// close group
			if (groupStart === idx - 1) {
				DEBUG && console.log(`CANCEL GROUP | TOO SHORT`)
			} else {
				groups.push({ start: groupStart, end: idx - 1 })
				DEBUG && console.log(`CLOSE GROUP | `, groups[groups.length - 1])
			}
			groupStart = undefined
			lastTokenType = undefined
		}
		if (token.type !== FENCE) {
			DEBUG && console.log('SKIP')
			continue
		}
		if (token.type === FENCE) {
			if (groupStart === undefined) {
				DEBUG && console.log('OPEN GROUP')
				groupStart = idx
			}
			//   if (lastTokenType === CLOSE_TYPE) {
			//     // this containers immediately follows another one!
			//   }
			//   currentContainerStart = idx;
		}
		lastTokenType = token.type
	}
	// insert wrapping tokens
	let idxOffset = 0
	groups.forEach((group) => {
		const start = group.start + idxOffset
		const start_token = new token_1.default('fence_group_start', 'CodeTabs', 1)
		state.tokens.splice(start, 0, start_token)
		idxOffset++
		const end = group.end + 1 + idxOffset
		const end_token = new token_1.default('fence_group_end', 'CodeTabs', -1)
		state.tokens.splice(end, 0, end_token)
		idxOffset++
	})
}
const getTabName = (token) => {
	if (
		(token === null || token === void 0 ? void 0 : token.type) === 'html_block'
	) {
		const match = token.content.match(/<!--\s*tab:(.+)\s*-->/)
		if (match) {
			return match[1]
		}
	}
}
function codeBlocksPlugin(md) {
	const process = md.core.process.bind(md.core)
	md.core.process = function (state) {
		process(state)
		processFenceContainers(state)
		return state
	}
	const fence = md.renderer.rules.fence
	md.renderer.rules.fence = (...args) => {
		var _a, _b
		const [tokens, idx] = args
		const token = tokens[idx]
		const prev = idx > 0 && tokens[idx - 1]
		let title =
			(_b =
				(_a = getTabName(prev)) !== null && _a !== void 0 ? _a : token.info) !==
				null && _b !== void 0
				? _b
				: 'Tab'
		const rawCode = fence(...args)
		const res = rawCode.replace(
			/"(language-\w+)">/,
			`"$1" data-tab-title="${title}">`
		)
		return res
	}
}
exports.codeBlocksPlugin = codeBlocksPlugin
