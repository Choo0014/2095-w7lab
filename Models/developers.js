const mongoose = require('mongoose');

let devsSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String

        }
    },
    level: {
        type: String,
        uppercase: true,
        validate: {
            validator: function (lvl) {
                 if (lvl === "BEGINNER" || lvl === "EXPERT"){
                    return lvl
                 } 
            },
            message: 'Level should only be Beginner or Expert'
        },
        required: true
    },
    address: {
        state: {
            type: String
        },
        suburb: {
            type: String
        },
        street: {
            type: String
        },
        unit: {
            type: String
        }
    }

});

module.exports = mongoose.model('Developers', devsSchema);