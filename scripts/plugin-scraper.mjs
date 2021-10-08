const puppeteer = require('puppeteer-extra')
const fse = require('fs-extra')
const chalk = require('chalk')
const log = console.log
// array of plugins to pull from - defined in vitepress.config
const plugins = require('../.vitepress/config').plugins

async function main() {
	try {
		const browser = await puppeteer.launch({
			headless: true,
		})

		plugins.forEach(async (item) => {
			item.children.forEach(async (plug) => {
				try {
					// have to be sure we go to the correct repo since payments and plugins are different
					let baseUrl
					if (item.text === 'Official Plugins') {
						baseUrl =
							'https://raw.githubusercontent.com/NativeScript/plugins/main/packages'
					} else if (item.text === 'Payment Plugins') {
						baseUrl =
							'https://raw.githubusercontent.com/NativeScript/payments/main/packages'
					}

					// now do work
					if (baseUrl) {
						// fix the url for the plugin we're grabbing
						const url = `${baseUrl}/${plug.link.replace(
							'/plugins/',
							''
						)}/README.md`

						log(`Fetching: ${url}`)

						const page = await browser.newPage()

						// Go to the plugin page and locate the README.md
						const response = await page.goto(url, {
							waitUntil: 'domcontentloaded',
						})

						// this is the README text :)
						const data = await response.text()

						const headerSnippet = [
							`---`,
							`title: ${plug.text}`,
							`link: ${url}`,
							`---`,
						].join('\n')

						// save the file
						fse.outputFileSync(
							`./${plug.link}.md`,
							`${headerSnippet}\n\n${data.trim()}`
						)
						log(chalk.green(`File saved for plugin: ${plug.text}`))
					}
				} catch (error) {
					log(chalk.red(error))
				}
			})
		})

		// process.exit()
	} catch (error) {
		log(chalk.red(error))
		process.exit()
	}
}

main()
