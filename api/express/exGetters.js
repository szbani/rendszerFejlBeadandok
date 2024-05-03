const express = require('express');
const router = express.Router();

const {getAllManagers} = require("../getters/ManagerGetters");
const {getDevelopersByProjectId, getAvailableDevelopersByProjectId, getDevelopers} = require("../getters/DeveloperGetters");
const {
     getTasksByManagerId, getTasksByManagerWithDeadlineInOneWeek, getTasksByProjectId
} = require("../getters/TaskGetters");
const {
    getProjects, getProjectByProjectId, getProjectTypes
} = require("../getters/ProjectGetters");
const {verifyToken, verifyTokenManager} = require("../auth/Authorization");

router.get('/', (req, res) => {
    const welcomeMessage = {
        message: 'Welcome to the Project Management API!'
    }
    res.send(welcomeMessage);
});
router.get('/managers', async (req, res) => {
    try {
        const token = verifyToken(req, res);
        if (token.statusCode != 200 && token.statusCode != 304) {
            return;
        }
        const managers = await getAllManagers();
        res.json(managers);
    } catch (error) {
        res.status(500).send();
    }
});
// router.get('/manager/:id', async (req, res) => {
//     try {
//         const projectId = req.params.id;
//         const managers = await getManagerById(projectId);
//         res.json(managers);
//     } catch (error) {
//         res.status(500).send();
//     }
// });
router.get('/manager/:id/tasks', async (req, res) => {
    try {
        const token = verifyToken(req, res);
        if (token.statusCode != 200 && token.statusCode != 304) {
            return;
        }
        const managerID = req.params.id;
        const tasks = await getTasksByManagerId(managerID);
        res.json(tasks);
    } catch (error) {
        return res.status(500).send();
    }
});
router.get('/manager/:email/deadlines', async (req, res) => {
    try {
        const token = verifyTokenManager(req, res);
        if (token.statusCode != 200 && token.statusCode != 304) {
            return;
        }
        const managerID = req.params.email;
        const tasksWithDeadline = await getTasksByManagerWithDeadlineInOneWeek(managerID);
        res.json(tasksWithDeadline);
    } catch (error) {
        return res.status(500).send();
    }
});
// router.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await getTasks();
//         res.json(tasks);
//     } catch (error) {
//         res.status(500).send();
//     }
// });
router.get('/developers', async (req, res) => {
    try {
        const token = verifyToken(req, res);
        if (token.statusCode != 200 && token.statusCode != 304) {
            return;
        }
        const developers = await getDevelopers();
        res.json(developers);
    } catch (error) {
        return res.status(500).send();
    }
});
router.get('/project/:id/availableDevelopers', async (req, res) => {
    try {
        const projectId = req.params.id;
        const token = verifyToken(req, res);
        if (token.statusCode != 200 && token.statusCode != 304) {
            return;
        }
        console.log(projectId);
        // console.log('asd')
        const developers = await getAvailableDevelopersByProjectId(projectId);
        // console.log('asd')
        res.json(developers);
    } catch (error) {
        res.status(500).send();
    }
});
router.get('/projects', async (req, res) => {
    try {
        const token = verifyToken(req, res);
        // console.log(token.statusCode);
        if (token.statusCode != 200 && token.statusCode != 304) {
            return;
        }
        const projects = await getProjects();

        return res.status(200).json(projects);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/project/:id', async (req, res) => {
    try {
        const token = verifyToken(req, res);
        if (token.statusCode != 200 && token.statusCode != 304) {
            return;
        }
        const projectId = req.params.id;
        const project = await getProjectByProjectId(projectId);
        res.json(project);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/project/:projectId/tasks', async (req, res) => {
    try {
        const token = verifyToken(req, res);
        if (token.statusCode != 200 && token.statusCode != 304) {
            return;
        }
        const projectId = req.params.projectId;
        const tasks = await getTasksByProjectId(projectId);
        res.json(tasks);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/project/:projectId/developers', async (req, res) => {
    try {
        const token = verifyToken(req, res);
        if (token.statusCode != 200 && token.statusCode != 304) {
            return;
        }
        const projectId = req.params.projectId;
        const developers = await getDevelopersByProjectId(projectId);
        res.json(developers);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/projecttypes', async (req, res) => {
    try {
        const token = verifyToken(req, res);
        // console.log(token.statusCode);
        if (token.statusCode != 200 && token.statusCode != 304) {
            return;
        }
        // console.log('asd')
        const projectTypes = await getProjectTypes();
        // console.log(projectTypes);
        res.status(200).json(projectTypes);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;