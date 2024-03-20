const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = async function () {
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
                type: 'addTask',
                name: 'task test',
                project_id: '65f3b74b77df5262b3453221',
                user_id: '65f3acb946a8a82e961b3fb9',
                deadline: '2025-06-25',
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

ws.onclose = function () {
    console.log('Disconnected');
}

ws.onerror = function (e) {
    console.log('Error: ' + e.data);
}



