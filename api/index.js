
const express = require('express');
const getters = require('./express/exGetters');
const deletes = require('./express/exDeletes');
const uploads = require('./express/uploadFile');
const {router} = require('./auth/Authorization');
const http = require('http');

const createWebSocketServer = require('./websocket/ws');
const {connectToDatabase} = require('./Mongo/MongoServer');
connectToDatabase();

// const swaggerUI = require('swagger-ui-express');
// const swaggerSpec = require('./swagger/swagger');

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
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api', getters);
app.use('/api', deletes);
app.use('/api', uploads);
// app.use('/api', updates);
app.use('/api', router);

process.on('SIGINT', () => {
    console.log('Closing server');
    process.exit();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

createWebSocketServer();

// Start the server

