require('dotenv').config({ path: __dirname + '/.env' })

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const PitchSchema = require('./models/Pitch')

const app = express()
app.use(cors({
	origin: 'http://localhost:5051',
	exposedHeaders: ['total']
}))

const PORT = process.env['PORT'] || 8080
const MONGO_URI = process.env['MONGO_URI']

let total = 0
PitchSchema.count((err, data) => {
	if (err) {
		console.log(`An error occured: ${err.res}`)
	}
	else {
		total = data
		console.log(`set header to ${data}`)
	}
})

// TODO: resolve headers passing issue
app.get('/home', (req, res) => {

	let page = parseInt(req.query.page) || 0
	let limit = parseInt(req.query.limit) || 101
	
	PitchSchema.find((err, data) => {
		if (err) {
			console.log(`An error occured: ${err.res}`)
		}
		else {
			res.setHeader('total', total)
			res.json(data)
		}
	})
		.skip((page - 1) * limit)
		.limit(limit)
})

app.get('/home/total', (req, res) => {

	PitchSchema.count((err, data) => {
		res.json(data)
	})
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