const WebSocket = require('ws');
const http = require('http');
const websocketModule = require('./websocket/TestClass');
const connect = require('./db/connect');
// const Manager = require('./schemas/Managers');

// Initialize HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running');
});

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

websocketModule(wss);

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});