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

            managerSchema.findByIdAndUpdate(jsonMessage._id, jsonMessage, {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                    ws.send(JSON.stringify({error: 'Error updating manager'}));
                }
                ws.send(JSON.stringify({message: 'Manager updated'}));
            });
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

            developerSchema.findByIdAndUpdate(jsonMessage._id, jsonMessage, {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                    ws.send(JSON.stringify({error: 'Error updating developer'}));
                }
                ws.send(JSON.stringify({message: 'Developer updated'}));
            });
            break;
        case 'updateProject':
            if (jsonMessage._id == undefined) {
                errors.push('Id is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage._id)) {
                errors.push('Invalid id');
            } else if (!await projectSchema.findById(jsonMessage._id)){
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

            projectSchema.findByIdAndUpdate(jsonMessage._id, jsonMessage, {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                    ws.send(JSON.stringify({error: 'Error updating project'}));
                }
                ws.send(JSON.stringify({message: 'Project updated'}));
            });
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
                errors.push('Developer is required');
            } else if (!mongoose.Types.ObjectId.isValid(jsonMessage.user_id)) {
                errors.push('Invalid developer_id');
            } else if (!await developerSchema.findById(jsonMessage.user_id)) {
                errors.push('Manager does not exist');
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

            taskSchema.findByIdAndUpdate(jsonMessage._id, jsonMessage, {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                    ws.send(JSON.stringify({error: 'Error updating task'}));
                }
                ws.send(JSON.stringify({message: 'Task updated'}));
            });
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

            projectTypeSchema.findByIdAndUpdate(jsonMessage._id, jsonMessage, {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                    ws.send(JSON.stringify({error: 'Error updating project_type'}));
                }
                ws.send(JSON.stringify({message: 'Project_Type updated'}));
            });
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

            projectDevSchema.findByIdAndUpdate(jsonMessage.project_id, jsonMessage, {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                    ws.send(JSON.stringify({error: 'Error updating project_developer'}));
                }
                ws.send(JSON.stringify({message: 'Project_Developer updated'}));
            });
            break;
        default:
            ws.send(JSON.stringify({error: 'Invalid type'}));
            break;
    }
}