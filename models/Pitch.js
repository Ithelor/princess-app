const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PitchSchema = new Schema({
    expression: String,
    reading: String,
    accent: String
},
    {
        collection: 'princess_db'
    }
)

module.exports = mongoose.model('PitchSchema', PitchSchema)