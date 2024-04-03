const {getAllManagers, getManagerById} = require("../getters/ManagerGetters");
const {getDevelopersByProjectId, getDevelopers} = require("../getters/DeveloperGetters");
const {
    getTasks, getTaskByTaskId, getTasksByManagerId, getTasksByManagerWithDeadlineInOneWeek, getTasksByProjectId
} = require("../getters/TaskGetters");
const {
    getProjects, getProjectByProjectId, getProjectsByProjectTypeId, getProjectTypes
} = require("../getters/ProjectGetters");


module.exports = async (jsonMessage,ws) => {
    let tasks;
    switch (jsonMessage.type) {
        case 'getManagers':
            const managers = await getAllManagers();
            ws.send(JSON.stringify(managers));
            break;
        case 'getManagerById':
            const manager = await getManagerById(jsonMessage.id);
            ws.send(JSON.stringify(manager));
            break;
        case 'getManagerTasks':
            tasks = await getTasksByManagerId(jsonMessage.id);
            ws.send(JSON.stringify(tasks));
            break;
        case 'getManagerDeadlines':
            const tasksWithDeadline = await getTasksByManagerWithDeadlineInOneWeek(jsonMessage.id);
            ws.send(JSON.stringify(tasksWithDeadline));
            break;
        case 'getTasks':
            tasks = await getTasks();
            ws.send(JSON.stringify(tasks));
            break;
        case 'getTaskByTaskId':
            const task = await getTaskByTaskId(jsonMessage.id);
            ws.send(JSON.stringify(task));
            break;
        case 'getDevelopers':
            const developers = await getDevelopers();
            ws.send(JSON.stringify(developers));
            break;
        case 'getProjects':
            const projects = await getProjects();
            ws.send(JSON.stringify(projects));
            break;
        case 'getProjectByProjectId':
            const project = await getProjectByProjectId(jsonMessage.id);
            ws.send(JSON.stringify(project));
            break;
        case 'getProjectsByProjectTypeId':
            const projectsByProjectTypeId = await getProjectsByProjectTypeId(jsonMessage.id);
            ws.send(JSON.stringify(projectsByProjectTypeId));
            break;
        case 'getProjectTasks':
            tasks = await getTasksByProjectId(jsonMessage.id);
            ws.send(JSON.stringify(tasks));
            break;
        case 'getDevelopersByProjectId':
            const developersByProjectId = await getDevelopersByProjectId(jsonMessage.id);
            ws.send(JSON.stringify(developersByProjectId));
            break;
        case 'getProjectTypes':
            const projectTypes = await getProjectTypes();
            ws.send(JSON.stringify(projectTypes));
            break;
        default:
            ws.send(JSON.stringify({error: 'Unknown type'}));
    }
}
