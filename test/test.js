const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function (e) {
    console.log('Connected');
    // ws.send('Hello Server');
    ws.send(JSON.stringify(
        {
            type: 'getAllManagers',
            action: 'GET'
        }
    ));
}

ws.onmessage = function (e) {
    console.log('Received: ' + e.data);
}

ws.onclose = function (e) {
    console.log('Disconnected');
}

ws.onerror = function (e) {
    console.log('Error: ' + e.data);
}


