const ppt = require('puppeteer-core')

const { MESSENGER_USER, MESSENGER_PASS, CHROMIUM_PATH } = process.env

function delay(time) {
	return new Promise(function(resolve) { 
		setTimeout(resolve, time)
	});
 }

module.exports = async () => {
	try {
		const browser = await ppt.launch({
			executablePath: CHROMIUM_PATH,
			headless: false,
			defaultViewport: null,
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox',
			]
		})
		const page = await browser.newPage();
		await page.goto('https://www.messenger.com')
		await delay(1000)
		await page.type('input#email', MESSENGER_USER)
		await page.type('input#pass', MESSENGER_PASS)
		await delay(1000)
		await Promise.all([
			page.click('button#loginbutton'),
			page.waitForNavigation({ waitUntil: 'networkidle0' }),
		])
		await delay(1000)

		return page
	} catch(e) {
		return false
	}
}
