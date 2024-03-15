const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Managers',
        required: true
    },
    deadline: {
        type: Date,
        required: false
    },
});

const Task = mongoose.model('Tasks', TaskSchema);

module.exports = Task;
