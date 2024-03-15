const mongoose = require('mongoose');

const Project_DevelopersSchema = new mongoose.Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: true
    },
    developer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developers',
        required: true
    }
});

const Project_Developers = mongoose.model('Project_Developers', Project_DevelopersSchema);

module.exports = Project_Developers;