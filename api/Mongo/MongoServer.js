const mongoose = require('mongoose');
const uri = "mongodb+srv://websocket:Websocket@rendszertest.syiircx.mongodb.net/Redmond?retryWrites=true&w=majority&appName=rendszertest";

async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    }
}

function disconnectFromDatabase() {
    mongoose.disconnect().then(() => {
        console.log("Disconnected from MongoDB");
    }).catch((error) => {
        console.error("Error disconnecting from MongoDB: ", error);
    });
}

module.exports = {
    connectToDatabase,
    disconnectFromDatabase,
    mongoose}