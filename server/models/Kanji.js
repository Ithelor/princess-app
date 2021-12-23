const mongoose = require('mongoose')

const Schema = mongoose.Schema

const KanjiSchema = new Schema(
  {
    index: Number,
    kanji: String,
    onyomi: String,
    kunyomi: String,
    strokes: Number,
    radical: String,
    meaning: String,
    level: Number
  },
  {
    collection: 'kanji-kentei'
  }
)

module.exports = mongoose.model('KanjiSchema', KanjiSchema)
