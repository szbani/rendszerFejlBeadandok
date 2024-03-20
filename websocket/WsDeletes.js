const managerSchema = require("../schemas/Managers");
const developerSchema = require("../schemas/Developers");
const projectSchema = require("../schemas/Projects");
const taskSchema = require("../schemas/Tasks");
const projectDevSchema = require("../schemas/Project_Developers");
const mongoose = require("mongoose");


module.exports = async (jsonMessage,ws) => {
    switch (jsonMessage.type) {
        case 'deleteManager':
            if (jsonMessage._id == undefined) {
                ws.send(JSON.stringify({error: 'Id is required'}));
                return;
            }else if(!mongoose.Types.ObjectId.isValid(jsonMessage._id)){
                ws.send(JSON.stringify({error: 'Invalid id'}));
                return;
            }else if (!await managerSchema.findById(jsonMessage._id)){
                ws.send(JSON.stringify({error: 'Manager not found'}));
                return;
            }

            await managerSchema.findByIdAndDelete(jsonMessage._id);
            await taskSchema.deleteMany({managerId: jsonMessage.id});
            ws.send(JSON.stringify({message: 'Manager deleted'}));
            break;
        case 'deleteDeveloper':
            if (jsonMessage._id == undefined) {
                ws.send(JSON.stringify({error: 'Id is required'}));
                return;
            }else if (!mongoose.Types.ObjectId.isValid(jsonMessage._id)){
                ws.send(JSON.stringify({error: 'Invalid id'}));
                return;
            }else if (!await developerSchema.findById(jsonMessage._id)){
                ws.send(JSON.stringify({error: 'Developer not found'}));
                return;
            }

            await developerSchema.findByIdAndDelete(jsonMessage._id);
            await projectDevSchema.deleteMany({developerId: jsonMessage.id});
            ws.send(JSON.stringify({message: 'Developer deleted'}));
            break;
        case 'deleteProject':
            if (jsonMessage._id == undefined) {
                ws.send(JSON.stringify({error: 'Id is required'}));
                return;
            }else if (!mongoose.Types.ObjectId.isValid(jsonMessage._id)){
                ws.send(JSON.stringify({error: 'Invalid id'}));
                return;
            }else if (!await projectSchema.findById(jsonMessage._id)){
                ws.send(JSON.stringify({error: 'Project not found'}));
                return;
            }

            await projectSchema.deleteOne({_id: jsonMessage.id});
            await projectDevSchema.deleteMany({projectId: jsonMessage.id});
            await taskSchema.deleteMany({projectId: jsonMessage.id});
            ws.send(JSON.stringify({message: 'Project deleted'}));
            break;
        case 'deleteTask':
            if (jsonMessage._id == undefined) {
                ws.send(JSON.stringify({error: 'Id is required'}));
                return;
            }else if (!mongoose.Types.ObjectId.isValid(jsonMessage._id)){
                ws.send(JSON.stringify({error: 'Invalid id'}));
                return;
            }else if (!await taskSchema.findById(jsonMessage._id)){
                ws.send(JSON.stringify({error: 'Task not found'}));
                return;
            }

            await taskSchema.findByIdAndDelete(jsonMessage._id);
            ws.send(JSON.stringify({message: 'Task deleted'}));
            break;
        case 'deleteProjectDeveloper':
            if (jsonMessage._id == undefined) {
                ws.send(JSON.stringify({error: 'Id is required'}));
                return;
            }else if (!mongoose.Types.ObjectId.isValid(jsonMessage._id)){
                ws.send(JSON.stringify({error: 'Invalid id'}));
                return;
            }else if (!await projectDevSchema.findById(jsonMessage._id)){
                ws.send(JSON.stringify({error: 'Project_Developer not found'}));
                return;
            }
            await projectDevSchema.findByIdAndDelete(jsonMessage._id);
            ws.send(JSON.stringify({message: 'Project_Developer deleted'}));
            break;
        default:
            ws.send(JSON.stringify({error: 'Unknown type'}));
    }
}