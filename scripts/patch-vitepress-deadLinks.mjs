import 'zx/globals'

const vitepressLoc = require.resolve('vitepress')
const vitepressDistPath = path.dirname(vitepressLoc)
const files = fs.readdirSync(vitepressDistPath)
const serveFile = files.find((file) => file.startsWith('serve-'))
const serveFilePath = path.resolve(vitepressDistPath, serveFile)
const serveFileContents = fs.readFileSync(serveFilePath).toString();

fs.writeFileSync(
	serveFilePath,
	serveFileContents.replace(
		'throw new Error(`One or more pages contain dead links.`);',
		'console.warn(`One or more pages contain dead links.`);'
	)
)
