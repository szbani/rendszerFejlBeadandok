const {Server} = require("socket.io");
const {getTasksByManagerWithDeadlineInOneWeek} = require("../getters/TaskGetters");


function createWebSocketServer() {

    const io = new Server(8888, {
        cors: {
            origin: '*',
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.emit('connected', 'Welcome to the chat!');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
        socket.on('message', (data) => {
            console.log('Message received', data);
            socket.emit('message', 'Message received');
        });
        socket.on('getdeadlines', async (data) => {
            console.log('Getting deadlines for', data);
            try {
                const deadlines = await getTasksByManagerWithDeadlineInOneWeek(data);

                // console.log(deadlines.length);
                socket.emit('deadlines', deadlines.length);
            }catch (err){
                console.log(data,err)
            }
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected');
            socket.disconnect(0);
        });
    });
    console.log('WebSocket server is running on port 8888')
    return io;
}

module.exports = createWebSocketServer;