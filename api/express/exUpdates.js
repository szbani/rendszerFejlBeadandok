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
let doc;

router.put('/manager/:id', async (req, res) => {
    try{
        // console.log(req.body);
        let id = req.params.id;
        let jsonMessage = req.body;
        console.log(jsonMessage);

        if (id == undefined) {
            errors.push('ID is required');
        } else if(!mongoose.Types.ObjectId.isValid(id)){
            errors.push('ID is not valid');
        } else if (!await managerSchema.findById(id)) {
            errors.push('Manager does not exist');
        }

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

        doc = await managerSchema.findByIdAndUpdate(id, jsonMessage, {
            new: true,
            runValidators: true,
            includeResultMetadata:true
        });
        if (doc.lastErrorObject.updatedExisting){
            res.status(200).json({message: 'Manager updated'});
        }else {
            res.status(500).json({error: 'Error updating manager'});
        }
    }catch(error){
        res.status(500).send();
        console.log(error);
    }
});

router.put('/project/:id', async (req, res) => {
    try{
        // console.log(req.body);
        let id = req.params.id;
        let jsonMessage = req.body;
        console.log(jsonMessage);

        if (id == undefined) {
            errors.push('ID is required');
        } else if(!mongoose.Types.ObjectId.isValid(id)){
            errors.push('ID is not valid');
        } else if (!await projectSchema.findById(id)) {
            errors.push('Project does not exist');
        }

        if (jsonMessage.name == undefined) {
            errors.push('Name is required');
        } else if (jsonMessage.name.trim().length < 3) {
            errors.push('Name must be at least 3 characters long');
        }

        if (jsonMessage.description == undefined) {
            errors.push('Description is required');
        } else if (jsonMessage.description.trim().length < 3) {
            errors.push('Description must be at least 3 characters long');
        }

        if (jsonMessage.type_id == undefined) {
            errors.push('Project type ID is required');
        } else if(!mongoose.Types.ObjectId.isValid(jsonMessage.type_id)){
            errors.push('Project type ID is not valid');
        } else if (!await projectTypeSchema.findById(jsonMessage.type_id)) {
            errors.push('Project type does not exist');
        }

        if (errors.length > 0) {
            res.status(500).json({error: errors});
            errors = [];
            return;
        }

        doc = await projectSchema.findByIdAndUpdate(id, jsonMessage, {
            new: true,
            runValidators: true,
            includeResultMetadata:true
        });
        if (doc.lastErrorObject.updatedExisting){
            res.status(200).json({message: 'Project updated'});
        }else {
            res.status(500).json({error: 'Error updating project'});
        }
    }catch(error){
        res.status(500).send();
        console.log(error);
    }
});

router.put('tasks/:id', async (req, res) => {
    try{
        // console.log(req.body);
        let id = req.params.id;
        let jsonMessage = req.body;
        console.log(jsonMessage);

        if (id == undefined) {
            errors.push('ID is required');
        } else if(!mongoose.Types.ObjectId.isValid(id)){
            errors.push('ID is not valid');
        } else if (!await taskSchema.findById(id)) {
            errors.push('Task does not exist');
        }

        if (jsonMessage.name == undefined) {
            errors.push('Name is required');
        } else if (jsonMessage.name.trim().length < 3) {
            errors.push('Name must be at least 3 characters long');
        }

        if (jsonMessage.description == undefined) {
            errors.push('Description is required');
        } else if (jsonMessage.description.trim().length < 3) {
            errors.push('Description must be at least 3 characters long');
        }

        if (jsonMessage.project_id == undefined) {
            errors.push('Project ID is required');
        } else if(!mongoose.Types.ObjectId.isValid(jsonMessage.project_id)){
            errors.push('Project ID is not valid');
        } else if (!await projectSchema.findById(jsonMessage.project_id)) {
            errors.push('Project does not exist');
        }

        if (jsonMessage.developer_id == undefined) {
            errors.push('Developer ID is required');
        } else if(!mongoose.Types.ObjectId.isValid(jsonMessage.developer_id)){
            errors.push('Developer ID is not valid');
        } else if (!await developerSchema.findById(jsonMessage.developer_id)) {
            errors.push('Developer does not exist');
        }

        if (errors.length > 0) {
            res.status(500).json({error: errors});
            errors = [];
            return;
        }

        doc = await taskSchema.findByIdAndUpdate(id, jsonMessage, {
            new: true,
            runValidators: true,
            includeResultMetadata:true
        });
        if (doc.lastErrorObject.updatedExisting){
            res.status(200).json({message: 'Task updated'});
        }else {
            res.status(500).json({error: 'Error updating task'});
        }
    }catch(error){
        res.status(500).send();
        console.log(error);
    }
});

module.exports = router;