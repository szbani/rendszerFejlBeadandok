const Websocket = require('ws');

function createWebsocketServer(server) {
    const wss = new Websocket.Server({ server });

    wss.on('connection', function connection(ws) {
        console.log('Client connected');

        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });

        ws.send('something');

        ws.on('close', function close() {
            console.log('Client disconnected');
        });
    });

    return wss;
}

module.exports = createWebsocketServer;