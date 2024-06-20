const { time } = require('console');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CreoSchema = mongoose.Schema(
    {
        userId : {
            type: String,
            required: [true, 'Please add a user id'],
        },

        name: {
            type: String,
            required: [true, 'Please add a name'],
        },

        element: {
            type: String,
            required: true,
        }, 
        
        size: {
            type: String,
            required: true,
        },

        imageId: {
            type: String,
            required: true,
        },

        
    },
    {
        timestamps: true
    }
)

CreoSchema.plugin(AutoIncrement, { inc_field: 'id'});
const Creo = mongoose.model("Creo", CreoSchema);

module.exports = Creo;