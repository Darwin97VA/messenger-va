const fs = require('fs')

console.log(
__filename //, (err, info) => {
)	// console.log(err, info)
// })

const setUtils = async page => {
	try {
	await Promise.all([
	fs.readdirSync(__dirname).map(async file => {
		if(file != 'utils.js' /* __filename */) {
			const url = path.resolve(__dirname, file)
			await page.addScripTag({ url })
		}
		return null
	})
	])
	return true
	} catch(e) {
	console.error(e)
	return false
	}
}
