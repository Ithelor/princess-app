export default interface IKanji {
  _id: String
  index: number
  kanji: String
  variant?: String
  onyomi?: String
  kunyomi?: String
  strokes: Number
  radical?: String
  meaning: String
  level?: Number
}
