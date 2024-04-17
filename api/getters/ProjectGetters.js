const projectSchema = require("../../schemas/Projects");
const taskSchema = require("../../schemas/Tasks");
const projectTypeSchema = require("../../schemas/Project_Types");
const projectDeveloperSchema = require("../../schemas/Project_Developers");

async function getProjects() {
    try {
        let projects = await projectSchema.find({})
            .populate('type_id', 'name -_id')
            .exec();
        projects = await Promise.all(projects.map(async project => {
            const sumTasks = await taskSchema.countDocuments({project_id: project._id})
            return {
                _id: project._id,
                name: project.name,
                type: project.type_id.name,
                description: project.description,
                sumTasks
            }
        }));
        return projects;
    } catch (error) {
        console.log("Error getting projects: ", error);
        throw error;
    }
}

async function getProjectTypes() {
    try {
        const projectTypes = await projectTypeSchema.find({});
        return projectTypes;
    } catch (error) {
        console.log("Error getting project types: ", error);
        throw error;
    }
}

async function getProjectByProjectId(projectId) {
    return projectSchema.findById(projectId);
}

async function getProjectsByProjectTypeId(projectTypeId) {
    return projectSchema.find({type_id: projectTypeId});
}

module.exports = {
    getProjects,
    getProjectTypes,
    getProjectByProjectId,
    getProjectsByProjectTypeId
}


