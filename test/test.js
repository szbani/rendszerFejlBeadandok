const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function (e) {
    console.log('Connected');
    // ws.send('Hello Server');
    ws.send(JSON.stringify(
        {
            action: 'AUTH',
            email: 'hujeno@gmail.com',
            password: 'password'
        }
    ));

    setTimeout(() => {
        ws.send(JSON.stringify(
            {
                action: 'GET',
                type: 'getManagers',
            }));
        // ws.send(JSON.stringify(
        //     {
        //         action: 'GET',
        //         type: 'getProjects',
        //     }));
    },5000);
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



