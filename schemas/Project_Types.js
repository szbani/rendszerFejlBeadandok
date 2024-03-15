const mongoose = require('mongoose');

const Project_TypesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

const Project = mongoose.model('Project_Types', Project_TypesSchema);

module.exports = Project;
