const mongoose = require('mongoose');

let tasksSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    taskName: {
        type: String,
        required: true
    },
    taskAssignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssignTo'
    },
    taskDueDate: {
        type: Date,
        required: true
    },
    taskStatus: {
        type: String,
        validate: {
            validator: function (statusVal) {
                return statusVal === "inProgress" || statusVal === "Complete";
            }
        },
        required: true
    },
    taskDesc: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tasks', tasksSchema);