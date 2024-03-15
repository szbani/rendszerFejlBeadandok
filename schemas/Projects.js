const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project_Types',
    },
    description: {
        type: String,
        required: false
    },

});

const Project = mongoose.model('Projects', ProjectSchema);

module.exports = Project;
