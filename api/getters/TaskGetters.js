const taskSchema = require("../../schemas/Tasks");

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
    let tasks =
        await taskSchema.find({project_id: projectId})
            .populate('user_id', 'name as user -_id')
            .populate('project_id', 'name -_id')
            .exec();
    tasks = await tasks.map(task => {
        return {
            _id: task._id,
            name: task.name,
            description: task.description,
            deadline: task.deadline,
            project: task.project_id.name,
            user: task.user_id.name
        }
    });
    console.log(tasks);

    return tasks;
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
