const io = require('socket.io-client');

const socket = io('http://localhost:8888');

socket.on('connect', () => {
    console.log('Connected');
});

socket.on('connected', (data) => {
    console.log(data);
});

socket.on('message', (data) => {
    console.log(data);
});

socket.emit('getDeadLine', '')

