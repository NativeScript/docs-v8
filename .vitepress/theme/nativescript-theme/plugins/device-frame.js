'use strict'
/**
 * Adds device frames to images
 *
 * For example:
 * /// frame ios
 * <img src="ios_screenshot.png">
 * ///
 *
 * /// frame android
 * <img src="android_screenshot.png">
 * ///
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.createDeviceFrameContainer = void 0
const container = require('markdown-it-container')
const klass = 'frame'
function createDeviceFrameContainer() {
	return [
		container,
		klass,
		{
			marker: '/',
			render(tokens, idx) {
				const token = tokens[idx]
				const info = token.info.trim().slice(klass.length).trim()
				const deviceFrameStart = `
        <div class="${info} device-frame">
          <div class="${info} small-round-top"/>
          <div class="${info} round-top-left"/>
          <div class="${info} speaker"/>
          <div class="${info} screenshot">
        `
				const deviceFrameEnd = `
          </div>
          <div class="${info} button"/>
        </div>
        `
				if (token.nesting === 1) {
					return deviceFrameStart
				} else {
					return deviceFrameEnd
				}
			},
		},
	]
}
exports.createDeviceFrameContainer = createDeviceFrameContainer
