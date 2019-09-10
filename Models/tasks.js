const mongoose = require('mongoose');

let tasksSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer',
        message: 'Developer needs to have a valid ID'
    },
    dueDate: {
        type: Date,
        required: true,
        message: 'Date needs to be in this format: DD/MM/YYYY'
    },
    desc: {
        type: String,
        required: true
    },
    status: {
        type: String,
        validate: {
            validator: function (statusVal) {
                return statusVal === "InProgress" || statusVal === "Complete";
            }
        },
        required: true,
        message: 'Status should only be "Inprogress" or "Complete" '
    }
});

module.exports = mongoose.model('Tasks', tasksSchema);