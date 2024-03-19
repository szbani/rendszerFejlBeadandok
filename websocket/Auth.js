const managerSchema = require('../schemas/Managers');

module.exports = async (jsonMessage) => {
    const manager = await managerSchema.findOne({email: jsonMessage.email});
    if (manager) {
        return manager.password === jsonMessage.password;
    }
    return false;
}