const ppt = require('puppeteer-core')

const { MESSENGER_USER, MESSENGER_PASS, CHROMIUM_PATH } = process.env

module.exports = async () => {
	const browser = await ppt.launch({
		executablePath: CHROMIUM_PATH,
		headless: false,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
		]
	})
	const page = await browser.newPage();
	await page.goto('https://www.messenger.com')
	await page.type('input#email', MESSENGER_USER)
	await page.type('input#pass', MESSENGER_PASS)
	await Promise.all([
		page.click('button#loginbutton'),
		page.waitForNavigation({ waitUntil: 'networkidle0' }),
	])

	return page
}
