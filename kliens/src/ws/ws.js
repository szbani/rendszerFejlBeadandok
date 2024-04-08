import react from 'react';

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function () {
    console.log('Connected');
    // ws.send(JSON.stringify(
    //     {
    //         action: 'AUTH',
    //         email: 'hujeno@gmail.com',
    //         password: 'password'
    //     }
    // ));

}
ws.onmessage = function (e) {
    console.log('Received: ' + e.data);
}

export default ws;