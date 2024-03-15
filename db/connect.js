const mongoose = require('mongoose');
const uri = "mongodb+srv://websocket:Websocket@rendszertest.syiircx.mongodb.net/Redmond?retryWrites=true&w=majority&appName=rendszertest";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const managerSchema = require('../schemas/Managers');
const taskSchema = require('../schemas/Tasks');
const developerSchema = require('../schemas/Developers');
const projectSchema = require('../schemas/Projects');
const projectDeveloperSchema = require('../schemas/Project_Developers');
const projectTypeSchema = require('../schemas/Project_Types');

const manager = new managerSchema({
    name: 'Hű Jenő',
    email: 'hujeno@gmail.com',
    password: 'password'
});

manager.save().then(() => console.log('Manager saved'));


const projectType = new projectTypeSchema({
    name: 'Type 1',
    description: 'Description 1'
});

projectType.save().then(() => console.log('Project Type saved'));

const project = new projectSchema({
    name: 'Project 1',
    type_id: projectType._id,
    description: 'Description 1',
});

project.save().then(() => console.log('Project saved'));

const developer1 = new developerSchema({
    name: 'Developer 1',
    email: 'dev1@gmail.com',
});

const developer2 = new developerSchema({
    name: 'Developer 2',
    email: 'dev2@gmail.com',
});

developer1.save().then(() => console.log('Developer 1 saved'));
developer2.save().then(() => console.log('Developer 2 saved'));

const projectDeveloper1 = new projectDeveloperSchema({
    project_id: project._id,
    developer_id: developer1._id
});

const projectDeveloper2 = new projectDeveloperSchema({
    project_id: project._id,
    developer_id: developer2._id
});

projectDeveloper1.save().then(() => console.log('Project Developer 1 saved'));
projectDeveloper2.save().then(() => console.log('Project Developer 2 saved'));

const task = new taskSchema({
    name: 'Task 1',
    description: 'Description 1',
    project_id: project._id,
    user_id: manager._id,
    deadline: new Date(),
});

task.save().then(() => console.log('Task saved'));
