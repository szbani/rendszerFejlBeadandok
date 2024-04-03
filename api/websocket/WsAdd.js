const managerSchema = require("../../schemas/Managers");
const developerSchema = require("../../schemas/Developers");
const projectSchema = require("../../schemas/Projects");
const taskSchema = require("../../schemas/Tasks");
const projectTypeSchema = require("../../schemas/Project_Types");
const projectDevSchema = require("../../schemas/Project_Developers");

const authenticate = require('./Auth');
const mongoose = require("mongoose");


module.exports = async (jsonMessage, ws) => {
    let errors = [];
    switch (jsonMessage.type) {
        case 'addManager':
            if (jsonMessage.name == undefined) {
                errors.push('Name is required');
            } else if (jsonMessage.name.trim().length < 3) {
                errors.push('Name must be at least 3 characters long');
            }

            if (jsonMessage.email == undefined) {
                errors.push('Email is required');
            } else if (!authenticate.emailValidations(jsonMessage.email)) {
                errors.push('Invalid email');
            } else if (await managerSchema.findOne({email: jsonMessage.email})) {
                errors.push('Email already exists');
            }

            if (jsonMessage.password == undefined) {
                errors.push('Password is required');
            } else if (jsonMessage.password.trim().length < 6) {
                errors.push('Password must be at least 6 characters long');
            }

            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }

            const manager = new managerSchema(jsonMessage);
            await manager.save();
            ws.send(JSON.stringify({message: 'Manager added'}));
            break;
        case 'addDeveloper':
            if (jsonMessage.name == undefined) {
                errors.push('Name is required');
            } else if (jsonMessage.name.trim().length < 3) {
                errors.push('Name must be at least 3 characters long');
            }

            if (jsonMessage.email == undefined) {
                errors.push('Email is required');
            } else if (!authenticate.emailValidations(jsonMessage.email)) {
                errors.push('Invalid email');
            } else if (await developerSchema.findOne({email: jsonMessage.email})) {
                errors.push('Email already exists');
            }

            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }

            const developer = new developerSchema(jsonMessage);
            await developer.save();
            ws.send(JSON.stringify({message: 'Developer added'}));
            break;
        case 'addProject':
            if (jsonMessage.name == undefined) {
                errors.push('Name is required');
            } else if (jsonMessage.name.trim().length < 3) {
                errors.push('Name must be at least 3 characters long');
            }

            if (jsonMessage.type_id == undefined) {
                errors.push('Type is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage.type_id)) {
                errors.push('Invalid type_id');
            } else if (!await projectTypeSchema.findById(jsonMessage.type_id)) {
                errors.push('Type not found');
            }

            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }

            const project = new projectSchema(jsonMessage);
            await project.save();
            ws.send(JSON.stringify({message: 'Project added'}));
            break;
        case 'addTask':
            if (jsonMessage.name == undefined) {
                errors.push('Name is required');
            } else if (jsonMessage.name.trim().length < 3) {
                errors.push('Name must be at least 3 characters long');
            }

            if (jsonMessage.project_id == undefined) {
                errors.push('ProjectId is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage.project_id)) {
                errors.push('Invalid project_id');
            } else if (!await projectSchema.findById(jsonMessage.project_id)) {
                errors.push('Project not found');
            }

            if (jsonMessage.user_id == undefined) {
                errors.push('Manager(user_id) is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage.user_id)) {
                errors.push('Invalid manager(user_id)');
            } else if (!await managerSchema.findById(jsonMessage.user_id)) {
                errors.push('Manager(user_id) not found');
            }

            if (jsonMessage.deadline == undefined) {
                errors.push('Deadline is required');
            } else if (!authenticate.dateValidations(jsonMessage.deadline)) {
                errors.push('Invalid date');
            }

            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }

            const task = new taskSchema(jsonMessage);
            await task.save();
            ws.send(JSON.stringify({message: 'Task added'}));
            break;
        case 'addProjectDeveloper':
            if (jsonMessage.project_id == undefined) {
                errors.push('ProjectId is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage.project_id)) {
                errors.push('Invalid project_id');
            } else if (!await projectSchema.findById(jsonMessage.project_id)) {
                errors.push('Project not found');
            }

            if (jsonMessage.developer_id == undefined) {
                errors.push('DeveloperId is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage.developer_id)) {
                errors.push('Invalid developer_id');
            } else if (!await developerSchema.findById(jsonMessage.developer_id)) {
                errors.push('Developer not found');
            }

            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }

            if (await projectDevSchema.findOne({
                project_id: jsonMessage.project_id,
                developer_id: jsonMessage.developer_id
            })) {
                ws.send(JSON.stringify({error: 'Developer already added'}));
            }

            const projectDev = new projectDevSchema(jsonMessage);
            await projectDev.save();
            ws.send(JSON.stringify({message: 'Project_Developer added'}));
            break;
        case 'addProjectType':
            if (jsonMessage.name == undefined) {
                errors.push('Name is required');
            } else if (jsonMessage.name.trim().length < 3) {
                errors.push('Name must be at least 3 characters long');
            } else if (await projectTypeSchema.findOne({name: jsonMessage.name})) {
                errors.push('Type already exists');
            }

            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }

            const projectType = new projectTypeSchema(jsonMessage);
            await projectType.save();
            ws.send(JSON.stringify({message: 'Project Type added'}));
            break;
        default:
            ws.send(JSON.stringify({error: 'Invalid type'}));
            break;
    }
}