'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.setupPrismCLILang = void 0
const prism_ = require('prismjs')
function setupPrismCLILang(prism = prism_) {
	prism.languages.cli = {
		comment: [/^#.*/gm, ...prism.languages.js.comment],
		output: {
			pattern: /^\$\:.*/gms,
			greedy: true,
			inside: {
				hidden: /^\$\:/,
			},
		},
		command: {
			// pattern: /^(\S+)\s(.*)/gm,
			pattern: /^(?:\$\s)?(?:.+\s\\(?:\r\n|\r|\n))*.+/gm,
			inside: {
				'command-line-break': {
					pattern: /\s\\(?:\r\n|\r|\n)/,
					alias: ['comment'],
				},
				'command-name': {
					pattern: /^(?:\$\s)?(\S+)/g,
					alias: ['keyword'],
					inside: {
						visual: /\$\s/,
					},
				},
				'command-flag': {
					pattern: /\s-\w\S*\s?/g,
					inside: {
						punctuation: /^\s-/,
						bold: /\S+/,
					},
				},
				'command-parameter': {
					pattern: /\s--\S+([\s=]\S+)?/g,
					inside: {
						'command-parameter-name': {
							pattern: /^(\s--)([\w-]+)/g,
							lookbehind: true,
							alias: ['bold'],
						},
						'command-parameter-value': {
							pattern: /(\s|=)(?!-)(\S+)/,
							lookbehind: true,
							alias: ['function-name'],
						},
						punctuation: /(--|=)/,
					},
				},
				'command-subcommand-name': {
					pattern: /^\s\w\S*\s?/g,
					alias: ['function'],
				},
			},
		},
	}
}
exports.setupPrismCLILang = setupPrismCLILang
