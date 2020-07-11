module.exports = async page => {
	try {
		await page.evaluate(() => {
			// constantes
			const URL = 'https://www.messenger.com/t/'

			const $ = (parent, str, all) => {
				if(typeof parent !== 'object') {
					all = str
					str = parent
					parent = document
				} 
				return ( all
					? [...parent.querySelectorAll(str)]
					: parent.querySelector(str) 
				)
			}
			const getElementsChats = () => 
				$('ul[aria-label="Lista de conversaciones"]>li', true)
			const getChats = () => {
				return getElementsChats().map(chat => {
					const elTooltipContent = $(chat, '[data-tooltip-content]')
					const elImg = $(chat, 'img')
					const img = elImg ? elImg.src : 
						elTooltipContent.
						firstElementChild
						.style
						.backgroundImage
						.slice(5, -2)
					const last = elTooltipContent
									.nextElementSibling
									.firstElementChild
									.nextElementSibling
					return {
						img,
						name: elTooltipContent.dataset.tooltipContent,
						user: $(chat, 'a')
							.dataset.href
							.split(URL)[1],
						news: !!chat.getAttribute('aria-relevant'),
						msg: last.firstElementChild.innerText,
						ago: last.lastElementChild.innerText,
					}
				})	
			}
			const getElControls = () => $('div[aria-label="Nuevo mensaje"]')
			const getNoReads = () => getChats().filter(({news})=>news)
			const getNew = () => {
				const chats = getChats()
				const lastNoRead = chats.find(({news})=>news)
				if(chats.indexOf(lastNoRead) === 0) {
					return lastNoRead
				} else {
					return { error: 'no es el primero chat', ...lastNoRead }
				}
			}
			window.____ = {
				$, 
				getElementsChats,
				getChats,
				getElControls,
				getNoReads,
				getNew
			}
			const open = user => {
				const url = URL+user
				const elementsChats = getElementsChats()
				const elUser = elementsChats.find(el => {
					const href = $(el, 'a').dataset.href
					return url === href
				})

				$(elUser, 'a').click()
			}
			const sendMessage = async () => {
				await $(getElControls(), '[data-offset-key]').click()
				await page.keyboard.type('Just adding a title')	
			}
		})
		return page
	} catch(e) {
		console.error(e)
		return false
	}
}
