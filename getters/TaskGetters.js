const taskSchema = require("../schemas/Tasks");

async function getTasks() {
    try {
        const tasks = await taskSchema.find({});
        return tasks;
    } catch (error) {
        console.log("Error getting tasks: ", error);
        throw error;
    }
}

async function getTasksByProjectId(projectId) {
    return taskSchema.find({project_id: projectId});
}

async function getTaskByTaskId(taskId) {
    return taskSchema.findById(taskId);
}

async function getTasksByManagerId(managerId) {
    return taskSchema.find({user_id: managerId});
}

async function getTasksByManagerWithDeadline(managerId, deadline) {

}
module.exports = {
    getTasks,
    getTasksByProjectId,
    getTaskByTaskId,
    getTasksByManagerId
}
