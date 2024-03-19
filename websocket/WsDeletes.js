const managerSchema = require("../schemas/Managers");
const developerSchema = require("../schemas/Developers");
const projectSchema = require("../schemas/Projects");
const taskSchema = require("../schemas/Tasks");
const projectDevSchema = require("../schemas/Project_Developers");


module.exports = async (jsonMessage,ws) => {
    switch (jsonMessage.type) {
        case 'deleteManager':
            await managerSchema.deleteOne({_id: jsonMessage.id});
            await taskSchema.deleteMany({managerId: jsonMessage.id});
            ws.send(JSON.stringify({message: 'Manager deleted'}));
            break;
        case 'deleteDeveloper':
            await developerSchema.deleteOne({_id: jsonMessage.id});
            await projectDevSchema.deleteMany({developerId: jsonMessage.id});
            ws.send(JSON.stringify({message: 'Developer deleted'}));
            break;
        case 'deleteProject':
            await projectSchema.deleteOne({_id: jsonMessage.id});
            await projectDevSchema.deleteMany({projectId: jsonMessage.id});
            await taskSchema.deleteMany({projectId: jsonMessage.id});
            ws.send(JSON.stringify({message: 'Project deleted'}));
            break;
        case 'deleteTask':
            await taskSchema.deleteOne({_id: jsonMessage.id});
            ws.send(JSON.stringify({message: 'Task deleted'}));
            break;
        case 'deleteProjectDeveloper':
            await projectDevSchema.deleteOne({_id: jsonMessage.id});
            ws.send(JSON.stringify({message: 'Project_Developer deleted'}));
            break;
        default:
            ws.send(JSON.stringify({error: 'Unknown type'}));
    }
}