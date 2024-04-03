const managerSchema = require('../../schemas/Managers');

module.exports.auth = async (jsonMessage) => {
    const manager = await managerSchema.findOne({email: jsonMessage.email});
    if (manager) {
        return manager.password === jsonMessage.password;
    }
    return false;
}

module.exports.emailValidations = (email) => {
    return email.toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

module.exports.dateValidations = (date) => {
    return date.match(/^\d{4}-\d{2}-\d{2}$/);
}