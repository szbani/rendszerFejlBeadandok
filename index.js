const http = require('http');
const createWebSocketServer = require('./websocket/ws');
const {connectToDatabase} = require('./Mongo/MongoServer');

connectToDatabase();

// Initialize HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running');
});

// Initialize WebSocket server
createWebSocketServer(server);

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});