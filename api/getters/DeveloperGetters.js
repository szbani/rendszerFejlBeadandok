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

async function getAvailableDevelopersByProjectId(projectId) {
    const projectDevelopers = await projectDeveloperSchema.find({project_id: projectId});
    const developers = await developerSchema.find({});
    const availableDevelopers = [];
    // console.log(developers);
    for (const developer of developers) {
        let isAvailable = true;
        // console.log('developer',developer._id);
        for (const projectDeveloper of projectDevelopers) {
            // console.log(projectDeveloper.developer_id);
            if (projectDeveloper.developer_id.equals(developer._id)) {
                isAvailable = false;
                break;
            }
        }
        if (isAvailable) {
            availableDevelopers.push(developer);
        }
    }
    return availableDevelopers;

}

module.exports = {
    getDevelopers,
    getDevelopersByProjectId,
    getAvailableDevelopersByProjectId
}