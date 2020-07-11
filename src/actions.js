module.exports = {
    typeMsg: async (page, msg) => {
        await page.click('div[aria-label="Nuevo mensaje"] [data-offset-key]')
        await page.keyboard.type(msg)
    },
    sendMsg: async page => {
        await page.click('[aria-label="Enviar"]')
    },
    getChats: page => page.evaluate(() => window.____.getChats()),
    openChat: async (page, user) => {
        await page.click(`a[data-href="https://www.messenger.com/t/${user}"`)
    },
    getNew: page => page.evaluate(() => window.____.getNew())
}