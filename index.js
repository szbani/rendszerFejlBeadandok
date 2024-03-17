const express = require('express');
const authenticate = require('./Mongo/Auth');
const {connectToDatabase, disconnectFromDatabase} = require('./Mongo/MongoServer');
const getters = require('./express/ExpressGetters');
const deletes = require('./express/ExpressDeletes');

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const cors = require('cors');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    contentType: 'application/json',
}

const PORT = process.env.PORT || 8080;

connectToDatabase();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// app.use(authenticate);
app.use((req, res, next) => {
    console.log("Request: ", req.method, req.url);
    next();
});

app.use('/api', getters);
app.use('/api',deletes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


process.on('SIGINT', async () => {
    console.log('Server Closed!');
    await disconnectFromDatabase();
    process.exit();
});
app.listen(PORT, () => {
    console.log(`Express listens on ${PORT}`)
});