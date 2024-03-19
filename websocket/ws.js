const Websocket = require('ws');
const wsGetters = require('./WsGetters');
const wsDeletes = require('./WsDeletes');
function createWebSocketServer(server) {
    const ws = new Websocket.Server({ server });

    ws.on('connection', function connection(ws) {
        console.log('Client connected');

        ws.send(JSON.stringify({message: 'Connected'}));
        ws.onmessage = function (message){
            console.log('Received: ' + message.data);
            let jsonMessage;
            try {
                jsonMessage = JSON.parse(message.data);
            }catch (e) {
                console.error('Error parsing JSON: ' + e);
                ws.send(JSON.stringify({error: 'Only JSON is allowed'}));
                return;
            }
            switch (jsonMessage.action){
                case "GET":
                    wsGetters(jsonMessage,ws);
                    break;
                case "DELETE":
                    wsDeletes(jsonMessage,ws);
                    break;
                case "UPLOAD":
                    //todo: Needs Implementation
                    //wsUpload(jsonMessage,ws)
                    break;
                case "UPDATE":
                    //todo: Needs Implementation
                    //wsUpdate(jsonMessage,ws)
                    break;
                default:
                    ws.send(JSON.stringify({error: 'Unknown action'}));
            }
        }
        ws.on('close', function close() {
            console.log('Client disconnected');
        });

    });

    return ws;
}

module.exports = createWebSocketServer;