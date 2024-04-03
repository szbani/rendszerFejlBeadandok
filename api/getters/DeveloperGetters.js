const projectDeveloperSchema = require("../../schemas/Project_Developers");
const developerSchema = require("../../schemas/Developers");

async function getDevelopers() {
    try {
        const developers = await developerSchema.find({});
        return developers;
    } catch (error) {
        console.log("Error getting developers: ", error);
        throw error;
    }
}

async function getDevelopersByProjectId(projectId) {
    const projectDevelopers = await projectDeveloperSchema.find({project_id: projectId});
    const developers = [];
    for (const projectDeveloper of projectDevelopers) {
        developers.push(await developerSchema.findById(projectDeveloper.developer_id));
    }
    return developers;
}

module.exports = {
    getDevelopers,
    getDevelopersByProjectId
}