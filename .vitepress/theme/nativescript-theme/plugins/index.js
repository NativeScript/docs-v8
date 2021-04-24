'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.setupPrismCLILang = exports.createDeviceFrameContainer = exports.wrapFlavorContainersInTabs = exports.markFlavorHeadings = exports.createFlavorContainer = exports.codeBlocksPlugin = void 0
var code_blocks_1 = require('./code-blocks')
Object.defineProperty(exports, 'codeBlocksPlugin', {
	enumerable: true,
	get: function () {
		return code_blocks_1.codeBlocksPlugin
	},
})
var flavor_container_1 = require('./flavor-container')
Object.defineProperty(exports, 'createFlavorContainer', {
	enumerable: true,
	get: function () {
		return flavor_container_1.createFlavorContainer
	},
})
Object.defineProperty(exports, 'markFlavorHeadings', {
	enumerable: true,
	get: function () {
		return flavor_container_1.markFlavorHeadings
	},
})
Object.defineProperty(exports, 'wrapFlavorContainersInTabs', {
	enumerable: true,
	get: function () {
		return flavor_container_1.wrapFlavorContainersInTabs
	},
})
var device_frame_1 = require('./device-frame')
Object.defineProperty(exports, 'createDeviceFrameContainer', {
	enumerable: true,
	get: function () {
		return device_frame_1.createDeviceFrameContainer
	},
})
var prism_lang_cli_1 = require('./prism-lang-cli')
Object.defineProperty(exports, 'setupPrismCLILang', {
	enumerable: true,
	get: function () {
		return prism_lang_cli_1.setupPrismCLILang
	},
})
