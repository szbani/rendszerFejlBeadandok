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

async function getTasksByManagerWithDeadlineInOneWeek(managerId) {
    const currDate = new Date();
    let date = new Date(currDate);
    date.setDate(currDate.getDate() + 7);
    console.log(date);
    return taskSchema.find({user_id: managerId, deadline: {$lte: date}});
}

module.exports = {
    getTasks,
    getTasksByProjectId,
    getTaskByTaskId,
    getTasksByManagerId,
    getTasksByManagerWithDeadlineInOneWeek
}
