module.exports = (wss) => {
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
};