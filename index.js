require('dotenv').config()
const { login, utils, actions } = require('./src')

;(async () => {
    const page = await login()
    await utils(page)
    page.on('request', async req => {
        if(req._url === 'https://www.messenger.com/ajax/mercury/delivery_receipts.php') {
            console.log(
                await actions.getNew(page)
            )
        }
    })
    await actions.openChat(page, 'Darwin97VA')
    await actions.typeMsg(page, 'Hola mundo')
    await actions.sendMsg(page)
    console.log(await actions.getChats(page))
})();

const net = require('net')
const crypto = require('crypto')
const PORT_WS = 9090


net
.createServer(
    socket => {
        socket.on('data', data => {
            //  
            const header = 'Sec-WebSocket-Key: ',
            lines = data.split('\r\n'),
            line = lines.find(line => line.includes(header)),
            key = line.split(header)[1].trim(),
            accept = key + 'asdasdsdsdsad___Asdds',
            acceptSHA = crypto.createHash('sha1').update(accept),
            acceptB64 = acceptSHA.digest('base64')
            
            // Header Response
            const header = 
            "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" +
            "Upgrade: websocket\r\n" +
            "Connection: Upgrade\r\n" +
            "WebSocket-Origin: http://localhost\r\n" +
            "WebSocket-Location: ws://localhost:9090\r\n"+
            "Sec-WebSocket-Accept:" + acceptB64 + "\r\n\r\n";

            socket.write(header);
        })        
    }
)
.listen(
    { host: 'localhost', port: PORT_WS },
    () => console.log(`WS run in ${PORT_WS}`)
)