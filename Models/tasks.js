const mongoose = require('mongoose');

let tasksSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    },
    dueDate: {
        type: Date,
        required: true
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
        required: true
    }
});

module.exports = mongoose.model('Tasks', tasksSchema);