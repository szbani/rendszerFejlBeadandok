const express = require('express');
const router = express.Router();

const managerSchema = require("../../schemas/Managers");
const developerSchema = require("../../schemas/Developers");
const projectSchema = require("../../schemas/Projects");
const taskSchema = require("../../schemas/Tasks");
const projectTypeSchema = require("../../schemas/Project_Types");
const projectDevSchema = require("../../schemas/Project_Developers");

const mongoose = require("mongoose");
let errors = [];

router.post('/manager', async (req, res) => {
    try{
        // console.log(req.body);
        let jsonMessage = req.body;
        console.log(jsonMessage);
        
        if (jsonMessage.name == undefined) {
            errors.push('Name is required');
        } else if (jsonMessage.name.trim().length < 3) {
            errors.push('Name must be at least 3 characters long');
        }

        if (jsonMessage.email == undefined) {
            errors.push('Email is required');
        } else if (await managerSchema.findOne({email: jsonMessage.email})) {
            errors.push('Email already exists');
        }

        if (jsonMessage.password == undefined) {
            errors.push('Password is required');
        } else if (jsonMessage.password.trim().length < 6) {
            errors.push('Password must be at least 6 characters long');
        }

        if (errors.length > 0) {
            res.status(500).json({error: errors});
            errors = [];
            return;
        }

        const manager = new managerSchema(jsonMessage);
        await manager.save();
        res.status(200).json({message: 'Manager added'});



    }catch(error){
        res.status(500).send();
        console.log(error);
    }
})

router.post('/developer', async (req, res) => {
    try{
        // console.log(req.body);
        let jsonMessage = req.body;
        console.log(jsonMessage);

        if (jsonMessage.name == undefined) {
            errors.push('Name is required');
        } else if (jsonMessage.name.trim().length < 3) {
            errors.push('Name must be at least 3 characters long');
        }

        if (jsonMessage.email == undefined) {
            errors.push('Email is required');
        } else if (await managerSchema.findOne({email: jsonMessage.email})) {
            errors.push('Email already exists');
        }

        if (errors.length > 0) {
            res.status(500).json({error: errors});
            errors = [];
            return;
        }

        const developer = new managerSchema(jsonMessage);
        await developer.save();
        res.status(200).json({message: 'Developer added'});

    }catch(error){
        res.status(500).send();
        console.log(error);
    }
})

router.post('/project', async (req, res) => {
    try{
        // console.log(req.body);
        let jsonMessage = req.body;
        console.log(jsonMessage);

        if (jsonMessage.name == undefined) {
            errors.push('Name is required');
        } else if (jsonMessage.name.trim().length < 3) {
            errors.push('Name must be at least 3 characters long');
        }

        if (jsonMessage.type_id == undefined) {
            errors.push('Type ID is required');
        }

        if (jsonMessage.description == undefined) {
            errors.push('Description is required');
        }

        if (errors.length > 0) {
            res.status(500).json({error: errors});
            errors = [];
            return;
        }

        const project = new managerSchema(jsonMessage);
        await project.save();
        res.status(200).json({message: 'Project added'});

    }catch(error){
        res.status(500).send();
        console.log(error);
    }
})

router.post('/tasks', async (req, res) => {
    try{
        // console.log(req.body);
        let jsonMessage = req.body;
        console.log(jsonMessage);

        if (jsonMessage.name == undefined) {
            errors.push('Name is required');
        } else if (jsonMessage.name.trim().length < 3) {
            errors.push('Name must be at least 3 characters long');
        }

        if (jsonMessage.description == undefined) {
            errors.push('Description is required');
        }

        if (jsonMessage.project_id == undefined) {
            errors.push('Project ID is required');
        }

        if (jsonMessage.user_id == undefined) {
            errors.push('User ID is required');
        }

        if (jsonMessage.deadline == undefined) {
            errors.push('Deadline is required');
        } else if (!(jsonMessage.deadline instanceof Date)) {
            errors.push('Deadline must be a date');
        } else if (jsonMessage.deadline > new Date()) {
            errors.push('Deadline must be a date in the future');
        }

        if (errors.length > 0) {
            res.status(500).json({error: errors});
            errors = [];
            return;
        }

        const task = new managerSchema(jsonMessage);
        await task.save();
        res.status(200).json({message: 'Task added'});

    }catch(error){
        res.status(500).send();
        console.log(error);
    }
})

router.post('/project/:id/dev', async (req, res) => {
    try{
        let id = req.params.id;
        if (id == undefined) {
            errors.push('ID is required');
        } else if (!mongoose.Types.ObjectId.isValid(id)) {
            errors.push('ID is not valid');
        } else if (!await projectSchema.findById(id)) {
            errors.push('Project does not exist');
        }
        // console.log(req.body);
        let jsonMessage = req.body;
        console.log(jsonMessage);

        if (jsonMessage.dev_id == undefined) {
            errors.push('ID is required');
        } else if (!mongoose.Types.ObjectId.isValid(jsonMessage.dev_id)) {
            errors.push('ID is not valid');
        } else if (!await developerSchema.findById(jsonMessage.dev_id)) {
            errors.push('Developer does not exist');
        }

        if (errors.length > 0) {
            res.status(500).json({error: errors});
            errors = [];
            return;
        }

        const pd = new projectDevSchema(
            {project_id: id, developer_id:jsonMessage.dev_id});
        await pd.save();
        res.status(200).json({message: 'Developer added to project'});

    }catch(error){
        res.status(500).send();
        console.log(error);
    }
})

module.exports = router;