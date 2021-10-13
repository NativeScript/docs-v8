const puppeteer = require('puppeteer-extra')
const fse = require('fs-extra')
const chalk = require('chalk')
const log = console.log

const config = require('../.vitepress/config')

async function main() {
	try {
		const browser = await puppeteer.launch({
			headless: true,
		})

		const promises = []

		const fetchData = async (plugin) => {
			const url = plugin.readme

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
				`title: ${JSON.stringify(plugin.name)}`,
				`link: ${url}`,
				`---`,
			].join('\n')

			// adds a link to the actual plugin repo to the MD file
			const repoSnippet = [
				`###  ![github logo]('../assets/images/github/GitHub-Mark-32px.png'): [${
					plugin.name
				}](${plugin.repo})`,
			].join('\n')

			// save the file
			fse.outputFileSync(
				`./${plugin.link}.md`,
				`${headerSnippet}\n\n${repoSnippet}\n\n${data.trim()}`
			)
			log(chalk.green(`File saved for plugin: ${plugin.name}`))
		}

		const walkPlugin = (plugin) => {
			if (plugin.category) {
				return walkPlugins(plugin.plugins)
			}

			if (plugin.readme) {
				promises.push(
					fetchData(plugin).catch((error) => {
						log(chalk.red(error))
					})
				)
			}
		}

		const walkPlugins = (plugins) => {
			plugins.forEach(walkPlugin)
		}

		walkPlugins(config.plugins)

		await Promise.all(promises)
		log(chalk.green('Done.'))
		process.exit()
	} catch (error) {
		log(chalk.red(error), error)
		process.exit()
	}
}

main()
