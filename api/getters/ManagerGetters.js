const managerSchema = require("../../schemas/Managers");

async function getAllManagers() {
    try {
        const managers = await managerSchema.find({}, {password: 0});
        return managers;
    } catch (error) {
        console.log("Error getting managers: ", error);
        throw error;
    }
}

async function getManagerById(managerId) {
    return managerSchema.findById(managerId);
}

module.exports = {
    getAllManagers,
    getManagerById
}