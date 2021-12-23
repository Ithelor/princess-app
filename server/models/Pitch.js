const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PitchSchema = new Schema(
  {
    expression: String,
    reading: String,
    accent: String
  },
  {
    collection: 'pitch-accents'
  }
)

module.exports = mongoose.model('PitchSchema', PitchSchema)
