const puppeteer = require('puppeteer-extra')
const fse = require('fs-extra')
const chalk = require('chalk')
const log = console.log
// array of plugins to pull from
const plugins = require('./plugins.json')

const baseURL =
	'https://raw.githubusercontent.com/NativeScript/plugins/main/packages'

async function main() {
	let browser

	try {
		log(chalk.yellow(new Date()))

		browser = await puppeteer.launch({
			headless: true,
		})

		const page = await browser.newPage()

		for (let i = 0; i < plugins.length; i++) {
			const item = plugins[i]
			const url = `${baseURL}/${item}/README.md`
			log(`Fetching: ${url}`)

			// Go to the plugin page and locate the README.md
			const response = await page.goto(url, {
				waitUntil: 'domcontentloaded',
			})

			// this is the README text :)
			const data = await response.text()

			const headerSnippet = `---
	title: ${item}
	link: https://raw.githubusercontent.com/NativeScript/plugins/master/packages/${item}/README.md
---`

			fse.outputFileSync(
				`./plugins/${item}.md`,
				`${headerSnippet} \n\n ${data.trim()}`
			)
			log(chalk.green(`File saved for plugin: ${item}`))
		}

		process.exit()
	} catch (error) {
		console.log(error)
	}
}

main()
