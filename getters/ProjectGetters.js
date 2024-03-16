const projectSchema = require("../schemas/Projects");
const projectTypeSchema = require("../schemas/Project_Types");
const projectDeveloperSchema = require("../schemas/Project_Developers");

async function getProjects() {
    try {
        const projects = await projectSchema.find({});
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
    return projectSchema.find({type_id : projectTypeId});
}

module.exports = {
    getProjects,
    getProjectTypes,
    getProjectByProjectId,
    getProjectsByProjectTypeId
}


