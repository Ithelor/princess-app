require('dotenv').config({ path: __dirname + '/.env' })

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const PitchSchema = require('./models/Pitch')
const KanjiSchema = require('./models/Kanji')

const app = express()
app.use(
  cors({
    origin: 'http://localhost:5051'
  })
)

const PORT = process.env['PORT'] || 8080
const MONGO_URI = process.env['MONGO_URI']

app.get('/kanjium', (req, res) => {
  let page = parseInt(req.query.page) || 1
  let limit = parseInt(req.query.limit) || 101

  PitchSchema.find((err, data) => {
    if (err) {
      console.log(`An error occured: ${err.res}`)
    } else {
      res.json(data)
    }
  })
    .skip((page - 1) * limit)
    .limit(limit)
})

app.get('/kentei', (req, res) => {
  let page = parseInt(req.query.page)
  let limit = parseInt(req.query.limit)
  let kanji = req.query.kanji

  if (page && limit) {
    KanjiSchema.find((err, data) => {
      if (err) {
        console.log(`An error occured: ${err.res}`)
      } else {
        res.json(data)
      }
    })
      .skip((page - 1) * limit)
      .limit(limit)
  } else {
    KanjiSchema.findOne({ kanji: kanji }, (err, data) => {
      if (err) {
        console.log(`An error occured: ${err.res}`)
      } else {
        res.json(data)
      }
    })
  }
})

try {
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      console.log('Database connected')
      app.listen(PORT, () => console.log(`App is running at ${PORT}..`))
    })
    .catch((err) => {
      console.error(err)
    })
} catch (err) {
  console.log('Database connection error', err.message)
  process.exit(1)
}

module.exports = app
