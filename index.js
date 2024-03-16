const express = require('express');
const authenticate = require('./servers/Auth');
const {getAllManagers, connectToDatabase, disconnectFromDatabase, getTasks, getProjectTypes, getProjects, getDevelopers} = require('./servers/MongoServer');

connectToDatabase();

const app = express();
app.use(authenticate);
app.use(express.json());
app.get('/api/managers', async (req, res) => {
    try {
        const managers = await getAllManagers();
        res.json(managers);
    } catch (error) {
        res.status(500).send();
    }
});
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).send();
    }
});
app.get('/api/developers', async (req, res) => {
    try {
        const developers = await getDevelopers();
        res.json(developers);
    } catch (error) {
        res.status(500).send();
    }
});
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await getProjects();
        res.json(projects);
    } catch (error) {
        res.status(500).send();
    }
});
app.get('/api/projecttypes', async (req, res) => {
    try {
        const projectTypes = await getProjectTypes();
        res.json(projectTypes);
    } catch (error) {
        res.status(500).send();
    }
});

// app.get('')


process.on('SIGINT', async () => {
    console.log('Server Closed!');
    await disconnectFromDatabase();
    process.exit();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Express listens on ${PORT}`)
});
