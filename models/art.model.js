const { time } = require('console');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ArtSchema = mongoose.Schema(
    {
        deskripsi: {
            type: String,
            required: [true, 'Please add a name'],
        },

        alamat: {
            type: String,
            required: true,
        }, 
        
        harga: {
            type: String,
            required: true,
        },

        gambar: {
            type: String,
            required: true,
        },

        auth: {
            type: String,
            required: true,
        }

        
    },
    {
        timestamps: true
    }
)

ArtSchema.plugin(AutoIncrement, { inc_field: 'id'});
const Art = mongoose.model("Art", ArtSchema);

module.exports = Art;