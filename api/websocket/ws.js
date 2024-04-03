const Websocket = require('api/websocket/ws');
const wsGetters = require('./WsGetters');
const wsDeletes = require('./WsDeletes');
const wsAdd = require('./WsAdd');
const wsUpdate = require('./wsUpdate');

const authenticate = require('./Auth');
function createWebSocketServer(server) {
    const ws = new Websocket.Server({server});

    ws.on('connection', function connection(ws) {
        console.log('Client connected');
        let isAuth = false;
        ws.send(JSON.stringify({message: 'Connected'}));
        ws.onmessage = function (message) {
            console.log('Received: ' + message.data);
            let jsonMessage;
            try {
                jsonMessage = JSON.parse(message.data);
            } catch (e) {
                console.error('Error parsing JSON: ' + e);
                ws.send(JSON.stringify({error: 'Only JSON is allowed'}));
                return;
            }
            if (!isAuth) {
                if (jsonMessage.action == 'AUTH') {
                    authenticate.auth(jsonMessage).then((result) => {
                        if (result) {
                            isAuth = true;
                            ws.send(JSON.stringify({message: 'Authenticated'}));
                        } else {
                            ws.send(JSON.stringify({error: 'Invalid email or password'}));
                        }
                    });
                }else{
                    ws.send(JSON.stringify({error: 'Not authenticated'}));
                }
            } else {
                switch (jsonMessage.action) {
                    case "GET":
                        wsGetters(jsonMessage, ws);
                        break;
                    case "DELETE":
                        wsDeletes(jsonMessage, ws);
                        break;
                    case "UPLOAD":
                        wsAdd(jsonMessage,ws)
                        break;
                    case "UPDATE":
                        wsUpdate(jsonMessage,ws)
                        break;
                    default:
                        ws.send(JSON.stringify({error: 'Unknown action'}));
                }
            }
        }
        ws.on('close', function close() {
            console.log('Client disconnected');
        });

    });

    return ws;
}

module.exports = createWebSocketServer;