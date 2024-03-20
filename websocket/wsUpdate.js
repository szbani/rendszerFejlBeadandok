const managerSchema = require("../schemas/Managers");
const developerSchema = require("../schemas/Developers");
const projectSchema = require("../schemas/Projects");
const taskSchema = require("../schemas/Tasks");
const projectTypeSchema = require("../schemas/Project_Types");
const projectDevSchema = require("../schemas/Project_Developers");

const authenticate = require('./Auth');
const mongoose = require("mongoose");

module.exports = async (jsonMessage, ws) => {
    let errors = [];
    let doc;
    switch (jsonMessage.type) {
        case 'updateManager':
            if (jsonMessage._id == undefined) {
                errors.push('Id is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage._id)) {
                errors.push('Invalid id');
            } else if (!await managerSchema.findById(jsonMessage._id)) {
                errors.push('Manager does not exist');
            }

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

            doc = await managerSchema.findByIdAndUpdate(jsonMessage._id, jsonMessage, {
                new: true,
                includeResultMetadata: true
            });
            if (doc.lastErrorObject.updatedExisting) {
                ws.send(JSON.stringify({message: 'Manager updated'}));
            } else {
                ws.send(JSON.stringify({error: 'Error updating manager'}));
            }
            break;
        case 'updateDeveloper':
            if (jsonMessage._id == undefined) {
                errors.push('Id is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage._id)) {
                errors.push('Invalid id');
            } else if (!await developerSchema.findById(jsonMessage._id)) {
                errors.push('Developer does not exist');
            }

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

            doc = await developerSchema.findByIdAndUpdate(jsonMessage._id, jsonMessage, {
                new: true,
                includeResultMetadata: true
            });
            if (doc.lastErrorObject.updatedExisting) {
                ws.send(JSON.stringify({message: 'Developer updated'}));
            } else {
                ws.send(JSON.stringify({error: 'Error updating developer'}));
            }
            break;
        case 'updateProject':
            if (jsonMessage._id == undefined) {
                errors.push('Id is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage._id)) {
                errors.push('Invalid id');
            } else if (!await projectSchema.findById(jsonMessage._id)) {
                errors.push('Project does not exist');
            }

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
                errors.push('Type does not exist');
            }

            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }

            doc = await projectSchema.findByIdAndUpdate(jsonMessage._id, jsonMessage, {
                new: true,
                includeResultMetadata: true
            });
            if (doc.lastErrorObject.updatedExisting) {
                ws.send(JSON.stringify({message: 'Project updated'}));
            } else {
                ws.send(JSON.stringify({error: 'Error updating project'}));
            }
            break;
        case 'updateTask':
            if (jsonMessage._id == undefined) {
                errors.push('Id is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage._id)) {
                errors.push('Invalid id');
            } else if (!await taskSchema.findById(jsonMessage._id)) {
                errors.push('Task does not exist');
            }

            if (jsonMessage.name == undefined) {
                errors.push('Name is required');
            } else if (jsonMessage.name.trim().length < 3) {
                errors.push('Name must be at least 3 characters long');
            }

            if (jsonMessage.project_id == undefined) {
                errors.push('Project is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage.project_id)) {
                errors.push('Invalid project_id');
            } else if (!await projectSchema.findById(jsonMessage.project_id)) {
                errors.push('Project does not exist');
            }

            if (jsonMessage.user_id == undefined) {
                errors.push('Manager(user_id) is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage.user_id)) {
                errors.push('Invalid manager_id(user_id)');
            } else if (!await managerSchema.findById(jsonMessage.user_id)) {
                errors.push('Manager(user_id) does not exist');
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

            doc = await taskSchema.findByIdAndUpdate(jsonMessage._id, jsonMessage, {
                new: true,
                includeResultMetadata: true
            });
            if (doc.lastErrorObject.updatedExisting) {
                ws.send(JSON.stringify({message: 'Task updated'}));
            } else {
                ws.send(JSON.stringify({error: 'Error updating task'}));
            }
            break;
        case 'updateProjectType':
            if (jsonMessage._id == undefined) {
                errors.push('Id is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage._id)) {
                errors.push('Invalid id');
            } else if (!await projectTypeSchema.findById(jsonMessage._id)) {
                errors.push('ProjectType does not exist');
            }

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

            doc = await projectTypeSchema.findByIdAndUpdate(jsonMessage._id, jsonMessage, {
                new: true,
                includeResultMetadata: true
            });

            if (doc.lastErrorObject.updatedExisting) {
                ws.send(JSON.stringify({message: 'ProjectType updated'}));
            } else {
                ws.send(JSON.stringify({error: 'Error updating projectType'}));
            }
            break;
        case 'updateProjectDeveloper':
            if (jsonMessage.projectDev_id == undefined) {
                errors.push('ProjectDevId is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage.projectDev_id)) {
                errors.push('Invalid projectDev_id');
            } else if (!await projectDevSchema.findById(jsonMessage.projectDev_id)) {
                errors.push('Project with Developer does not exist');
            }

            if (jsonMessage.project_id == undefined) {
                errors.push('ProjectId is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage.project_id)) {
                errors.push('Invalid project_id');
            } else if (!await projectSchema.findById(jsonMessage.project_id)) {
                errors.push('Project does not exist');
            }

            if (jsonMessage.developer_id == undefined) {
                errors.push('DeveloperId is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage.developer_id)) {
                errors.push('Invalid developer_id');
            } else if (!await developerSchema.findById(jsonMessage.developer_id)) {
                errors.push('Developer does not exist');
            }

            if (errors.length > 0) {
                ws.send(JSON.stringify({error: errors}));
                return;
            }

            doc = await projectDevSchema.findByIdAndUpdate(jsonMessage.project_id, jsonMessage, {
                new: true,
                includeResultMetadata: true
            });
            if (doc.lastErrorObject.updatedExisting) {
                ws.send(JSON.stringify({message: 'ProjectDeveloper updated'}));
            } else {
                ws.send(JSON.stringify({error: 'Error updating projectDeveloper'}));
            }
            break;
        default:
            ws.send(JSON.stringify({error: 'Invalid type'}));
            break;
    }
}