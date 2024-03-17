const express = require('express');
const authenticate = require('./Mongo/Auth');
const {connectToDatabase, disconnectFromDatabase} = require('./Mongo/MongoServer');
const cors = require('cors');
const {
    getProjects,
    getProjectTypes,
    getProjectByProjectId,
    getProjectsByProjectTypeId
} = require("./getters/ProjectGetters");
const {getTasksByProjectId, getTasks, getTasksByManagerId, getTaskByTaskId, getTasksByManagerWithDeadlineInOneWeek} = require("./getters/TaskGetters");
const {getDevelopersByProjectId, getDevelopers} = require("./getters/DeveloperGetters");
const {getAllManagers, getManagerById} = require("./getters/ManagerGetters");

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

app.get('/', (req, res) => {
    const welcomeMessage = {
        message: 'Welcome to the Project Management API!'
    }
    res.send(welcomeMessage);
});

// app.use(authenticate);
app.use((req, res, next) => {
    console.log("Request: ", req.method, req.url);
    next();
});

app.get('/api/managers', async (req, res) => {
    try {
        const managers = await getAllManagers();
        res.json(managers);
    } catch (error) {
        res.status(500).send();
    }
});
app.get('/api/manager/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const managers = await getManagerById(projectId);
        res.json(managers);
    } catch (error) {
        res.status(500).send();
    }
});
app.get('/api/manager/:id/tasks', async (req, res) => {
    try {
        const managerID = req.params.id;
        const tasks = await getTasksByManagerId(managerID);
        res.json(tasks);
    } catch (error) {
        res.status(500).send();
    }
});
app.get('/api/manager/:id/deadlines', async (req, res) => {
    try {
        const managerID = req.params.id;
        const tasksWithDeadline = await getTasksByManagerWithDeadlineInOneWeek(managerID);
        res.json(tasksWithDeadline);
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
app.get('/api/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await getTaskByTaskId(taskId);
        res.json(task);
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

app.get('/api/project/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectByProjectId(projectId);
        res.json(project);
    } catch (error) {
        res.status(500).send();
    }
});
app.get('/api/projects/:projectTypeId', async (req, res) => {
    try {
        const projectTypeId = req.params.projectTypeId;
        const projects = await getProjectsByProjectTypeId(projectTypeId);
        res.json(projects);
    } catch (error) {
        res.status(500).send();
    }
});
app.get('/api/project/:projectId/tasks', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const tasks = await getTasksByProjectId(projectId);
        res.json(tasks);
    } catch (error) {
        res.status(500).send();
    }
});

app.get('/api/project/:projectId/developers', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const developers = await getDevelopersByProjectId(projectId);
        res.json(developers);
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
app.listen(PORT, () => {
    console.log(`Express listens on ${PORT}`)
});
