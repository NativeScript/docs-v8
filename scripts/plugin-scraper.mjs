const puppeteer = require('puppeteer-extra')
const fse = require('fs-extra')
const log = console.log
const debug = false
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
				`<div style="width: 100%; padding: 1.2em 0em">`,
				`	<img alt="github logo" src="../assets/images/github/GitHub-Mark-32px.png" style="display: inline; margin: 1em 0.5em 1em 0em">`,
				`	<a href="${plugin.repo}" target="_blank" noopener>${plugin.name}</a>`,
				`</div>`,
			].join('\n')

			// transformers...
			let content = data;
			content = transformImagePaths(data, url)
			content = transformNoteStyle(content)

			// save the file
			fse.outputFileSync(
				`./${plugin.link}.md`,
				`${headerSnippet}\n\n${repoSnippet}\n\n${content}`
			)
			log(`File saved for plugin: ${plugin.name}`)
		}

		const walkPlugin = (plugin) => {
			if (plugin.category) {
				return walkPlugins(plugin.plugins)
			}

			if (plugin.readme) {
				promises.push(
					fetchData(plugin).catch((error) => {
						log(error)
					})
				)
			}
		}

		const walkPlugins = (plugins) => {
			plugins.forEach(walkPlugin)
		}

		walkPlugins(config.plugins)

		await Promise.all(promises)
		log('Done.')
		process.exit()
	} catch (error) {
		log(error, error)
		process.exit()
	}
}

function transformNoteStyle(content) {
	// transforms note styles for vitepress
	const NOTE_RE = /^>\s+\*{2}([^\*]+)\*{2}:?[^\S\r\n]+(.+(?:\n>.*)*)/gim
	let match_
	const containerTypeMap = {
		note: 'tip',
		warning: 'warning',
	}

	while ((match_ = NOTE_RE.exec(content))) {
		let [match, title, cont] = match_

		debug &&
			console.log({
				match,
				title,
				cont,
			})

		// normalize title
		title = title.replace(/:/g, '')

		// replace "> " from multiline quotes
		cont = cont.replace(/^>\s*/gim, '')

		// generate replacement
		let containerType = containerTypeMap[title.toLowerCase()] ?? 'tip'
		const replacement = `:::${containerType} ${title}\n\n${cont}\n\n:::`

		// replace the match with the replacement
		content = content.replace(match, replacement)
	}

	return content
}

function transformImagePaths(content, baseUrl) {
	// replace relative/absolute image urls with full urls
	// rudimentary approach, but seems fine for the plugin readmes we have for now.
	return content.replaceAll(
		/(!\[[^\]]*\]\()([./].*?)\s*(?:"(?:.*[^"])")?\s*(\))/gim,
		(_, p1, path, p3) => {
			const url = `${baseUrl.replace(/(main)\/.+/, '$1')}${path}`

			debug && console.log('Transforming image path', {
				p1,
				path,
				p3,
				baseUrl,
				url,
			})
			return `${p1}${url}${p3}`
		}
	)
}

main()
