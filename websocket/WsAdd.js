const managerSchema = require("../schemas/Managers");
const developerSchema = require("../schemas/Developers");
const projectSchema = require("../schemas/Projects");
const taskSchema = require("../schemas/Tasks");
const projectTypeSchema = require("../schemas/Project_Types");
const projectDevSchema = require("../schemas/Project_Developers");

const authenticate = require('./Auth');


module.exports = async (jsonMessage, ws) => {
    let errors = [];
    switch (jsonMessage.type) {
        case 'addManager':
            if (jsonMessage.name == undefined) {
                errors.push('Name is required');
            }
            if (jsonMessage.email == undefined) {
                errors.push('Email is required');
            }else if (!authenticate.emailValidations(jsonMessage.email)) {
                errors.push('Invalid email');
            }
            if (jsonMessage.password == undefined) {
                errors.push('Password is required');
            }
            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }
            if (await managerSchema.findOne({email: jsonMessage.email})) {
                ws.send(JSON.stringify({error: 'Email already exists'}));
                return;
            } else {
                const manager = new managerSchema(jsonMessage);
                await manager.save();
                ws.send(JSON.stringify({message: 'Manager added'}));
            }
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
            }
            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }
            if (await developerSchema.findOne({email: jsonMessage.email})) {
                ws.send(JSON.stringify({error: 'Email already exists'}));
                return;
            } else {
                const developer = new developerSchema(jsonMessage);
                await developer.save();
                ws.send(JSON.stringify({message: 'Developer added'}));
            }
            break;
        case 'addProject':
            if (jsonMessage.name == undefined) {
                errors.push('Name is required');
            } else if (jsonMessage.name.trim().length < 3) {
                errors.push('Name must be at least 3 characters long');
            }
            if (jsonMessage.type_id == undefined) {
                errors.push('Type is required');
            }
            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }
            if (!await projectType.findOne({_id: jsonMessage.type_id})) {
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
            }
            if (jsonMessage.user_id == undefined) {
                errors.push('userId(Manager) is required');
            }
            if (jsonMessage.deadline == undefined) {
                errors.push('Deadline is required');
            }
            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }

            if (!await projectSchema.findOne({_id: jsonMessage.project_id})) {
                errors.push('Project not found');
            }
            if (!await managerSchema.findOne({_id: jsonMessage.user_id})) {
                errors.push('Manager not found');
            }
            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            } else {
                const task = new taskSchema(jsonMessage);
                await task.save();
                ws.send(JSON.stringify({message: 'Task added'}));
            }
            break;
        case 'addProjectDeveloper':
            if (jsonMessage.project_id == undefined) {
                errors.push('ProjectId is required');
            }
            if (jsonMessage.developer_id == undefined) {
                errors.push('DeveloperId is required');
            }
            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }
            if (await projectDevSchema.findOne({
                project_id: jsonMessage.project_id,
                developer_id: jsonMessage.developer_id
            })) {
                errors.push('Developer already in project');
            }
            if (!await projectSchema.findOne({_id: jsonMessage.project_id})) {
                errors.push('Project not found');
            }
            if (!await developerSchema.findOne({_id: jsonMessage.developer_id})) {
                errors.push('Developer not found');
            }
            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            } else {
                const projectDev = new projectDevSchema(jsonMessage);
                await projectDev.save();
                ws.send(JSON.stringify({message: 'Project_Developer added'}));
            }
            break;
        case 'addProjectType':
            if (jsonMessage.name == undefined) {
                errors.push('Name is required');
            } else if (jsonMessage.name.trim().length < 3) {
                errors.push('Name must be at least 3 characters long');
            }
            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }
            if (await projectType.findOne({name: jsonMessage.name})) {
                ws.send(JSON.stringify({error: 'Type already exists'}));
                return;
            } else {
                const projectType = new projectTypeSchema(jsonMessage);
                await projectType.save();
                ws.send(JSON.stringify({message: 'Project Type added'}));
            }
            break;
    }
}