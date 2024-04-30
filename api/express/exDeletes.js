const express = require('express');
const router = express.Router();
const managerSchema = require("../../schemas/Managers");
const developerSchema = require("../../schemas/Developers");
const projectSchema = require("../../schemas/Projects");
const taskSchema = require("../../schemas/Tasks");
const projectDevSchema = require("../../schemas/Project_Developers");
const {verifyTokenManager} = require("../auth/Authorization");

router.delete('/manager/:id', async (req, res) => {
    try {
        const token = verifyTokenManager(req, res);
        if (token.statusCode == 200) {
            const managerId = req.params.id;
            const deleteUser = await managerSchema.findByIdAndDelete(managerId);
            if (!deleteUser) {
                return res.status(404).json({message: `Manager with id: ${managerId} not found!`});
            }
            await taskSchema.deleteMany({user_id: managerId});
            res.status(200).json({message: `Manager and tasks with manager id: ${managerId} has been deleted!`});
        }
    } catch (error) {
        res.status(500).send();
    }
});

router.delete('/developer/:id', async (req, res) => {
    try {
        const token = verifyTokenManager(req, res);
        if (token.statusCode == 200) {
            const developerId = req.params.id;
            const deleteDev = await developerSchema.findByIdAndDelete(developerId);
            if (!deleteDev) {
                return res.status(404).json({message: `Developer with id: ${developerId} not found!`});
            }
            await projectDevSchema.deleteMany({developer_id: developerId});
            res.status(200).json({message: `Developer with developer id: ${developerId} has been deleted!`});
        }
    } catch (error) {
        res.status(500).send();
    }
});

router.delete('/project/:id', async (req, res) => {
    try {
        const token = verifyTokenManager(req, res);
        console.log(token);
        if (token.statusCode == 200) {
            const projectId = req.params.id;
            const deleteProject = await projectSchema.findByIdAndDelete(projectId);
            if (!deleteProject) {
                return res.status(404).json({message: `Project with id: ${projectId} not found!`});
            }
            await projectDevSchema.deleteMany({project_id: projectId});
            await taskSchema.deleteMany({project_id: projectId});
            res.status(200).json({message: `Project and tasks with project id: ${projectId} has been deleted!`});
        }
    } catch (error) {
        res.status(500).send();
    }
});

router.delete('/project/:projectID/task/:taskId', async (req, res) => {
    try {
        const token = verifyTokenManager(req, res);
        // console.log(token.statusCode);
        if (token.statusCode == 200) {
            // console.log('lefutott!!!!!!!!!!!!!!!')
            const tid = req.params.taskId;
            const deleteTask = await taskSchema.findByIdAndDelete(tid);
            if (!deleteTask) {
                return res.status(404).json({message: `Task with id: ${tid} not found!`});
            }
            res.status(200).json({message: `Task with task id: ${tid} has been deleted!`});
        }
    } catch (error) {
        res.status(500).send();
    }
});

router.delete('/project/:projectId/developer/:developerId', async (req, res) => {
    try {
        const token = verifyTokenManager(req, res);
        console.log(token.statusCode);
        if (token.statusCode == 200) {
            const projectId = req.params.projectId;
            const developerId = req.params.developerId;
            const deleteDev = await projectDevSchema.findOneAndDelete({project_id: projectId, developer_id: developerId});
            if (!deleteDev) {
                return res.status(404).json({message: `Developer with developer id: ${developerId} not found on project with id: ${projectId} !`});
            }
            res.status(200).json({message: `Developer with developer id: ${developerId} has been deleted on project with id: ${projectId} !`});
        }
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;