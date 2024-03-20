const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = async function (e) {
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
                action: 'UPLOAD',
                type: 'addManager',
                name: 'Deb Ella',
                email: 'debellagmail.com',
                password: 'password'
            }));
    //      ws.send(JSON.stringify(
    //         {
    //             action: 'GET',
    //             type: 'getProjects',
    //         }));
    //     ws.send(JSON.stringify(
    //         {
    //             action: 'UPLOAD',
    //             type: 'addManager',
    //             name: 'B.Ödön',
    //             email: 'bodon@gmail.com',
    //             password: 'password'
    //         }));
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



