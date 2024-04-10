
const express = require('express');
const getters = require('./express/exgetters');
const deletes = require('./express/exdeletes');

// const createWebSocketServer = require('./websocket/ws');
const {connectToDatabase} = require('./Mongo/MongoServer');
connectToDatabase();

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');

const cors = require('cors');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    contentType: 'application/json'
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use((req,res,next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api', getters);
app.use('/api', deletes);

process.on('SIGINT', () => {
    console.log('Closing server');
    process.exit();
});


// Initialize HTTP server
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Server is running');
// });


// Initialize WebSocket server
// createWebSocketServer(server);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});