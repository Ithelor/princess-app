require('dotenv').config({ path: __dirname + '/.env' })

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const PitchSchema = require('./models/Pitch')

const app = express()
app.use(cors())

const PORT = process.env['PORT'] || 8080
const MONGO_URI = process.env['MONGO_URI']

app.get('/home', (req, res) => {
	
	PitchSchema.find((err, data) => {
		if (err) {
			console.log(`An error occured: ${err.res}`)
		}
		else {
			res.json(data)
		}
	}).limit(10)
})

try {

	mongoose
		.connect(MONGO_URI, { useNewUrlParser: true })
		.then(() => {
			console.log('MongoDB Connected');
		})
		.then(() => {
			app.listen(PORT, () => console.log(`App is running at ${PORT}..`))
		})
		.catch(err => {
			console.error(err)
		})
} catch (err) {
	
	console.log('Server Error', err.message)
	process.exit(1)
}

module.exports = app