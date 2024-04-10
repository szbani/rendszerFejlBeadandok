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

module.exports = router;