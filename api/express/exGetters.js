const express = require('express');
const router = express.Router();

const {getAllManagers, getManagerById} = require("../getters/ManagerGetters");
const {getDevelopersByProjectId, getDevelopers} = require("../getters/DeveloperGetters");
const {
    getTasks, getTaskByTaskId, getTasksByManagerId, getTasksByManagerWithDeadlineInOneWeek, getTasksByProjectId
} = require("../getters/TaskGetters");
const {
    getProjects, getProjectByProjectId, getProjectsByProjectTypeId, getProjectTypes
} = require("../getters/ProjectGetters");

router.get('/', (req, res) => {
    const welcomeMessage = {
        message: 'Welcome to the Project Management API!'
    }
    res.send(welcomeMessage);
});
router.get('/managers', async (req, res) => {
    try {
        const managers = await getAllManagers();
        res.json(managers);
    } catch (error) {
        res.status(500).send();
    }
});
router.get('/manager/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const managers = await getManagerById(projectId);
        res.json(managers);
    } catch (error) {
        res.status(500).send();
    }
});
router.get('/manager/:id/tasks', async (req, res) => {
    try {
        const managerID = req.params.id;
        const tasks = await getTasksByManagerId(managerID);
        res.json(tasks);
    } catch (error) {
        res.status(500).send();
    }
});
router.get('/manager/:id/deadlines', async (req, res) => {
    try {
        const managerID = req.params.id;
        const tasksWithDeadline = await getTasksByManagerWithDeadlineInOneWeek(managerID);
        res.json(tasksWithDeadline);
    } catch (error) {
        res.status(500).send();
    }
});
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).send();
    }
});
router.get('/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await getTaskByTaskId(taskId);
        res.json(task);
    } catch (error) {
        res.status(500).send();
    }
});
router.get('/developers', async (req, res) => {
    try {
        const developers = await getDevelopers();
        res.json(developers);
    } catch (error) {
        res.status(500).send();
    }
});
router.get('/projects', async (req, res) => {
    try {
        const projects = await getProjects();
        res.json(projects);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/project/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectByProjectId(projectId);
        res.json(project);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/project/:projectId/tasks', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const tasks = await getTasksByProjectId(projectId);
        res.json(tasks);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/project/:projectId/developers', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const developers = await getDevelopersByProjectId(projectId);
        res.json(developers);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/projecttypes', async (req, res) => {
    try {
        const projectTypes = await getProjectTypes();
        res.json(projectTypes);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;