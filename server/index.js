require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PitchSchema = require('./models/Pitch');

const app = express();
app.use(
	cors({
		origin: 'http://localhost:5051',
		exposedHeaders: ['total'],
	})
);

const PORT = process.env['PORT'] || 8080;
const MONGO_URI = process.env['MONGO_URI'];

let total = 0;
PitchSchema.count((err, data) => {
	if (err) {
		console.log(`An error occured: ${err.res}`);
	} else {
		total = data;
	}
});

app.get('/home', (req, res) => {
	let page = parseInt(req.query.page) || 0;
	let limit = parseInt(req.query.limit) || 101;

	PitchSchema.find((err, data) => {
		if (err) {
			console.log(`An error occured: ${err.res}`);
		} else {
			res.setHeader('total', total);
			res.json(data);
		}
	})
		.skip((page - 1) * limit)
		.limit(limit);
});

try {
	mongoose
		.connect(MONGO_URI, { useNewUrlParser: true })
		.then(() => {
			console.log('Database Connected');
		})
		.then(() => {
			app.listen(PORT, () => console.log(`App is running at ${PORT}..`));
		})
		.catch((err) => {
			console.error(err);
		});
} catch (err) {
	console.log('Databaase connection error', err.message);
	process.exit(1);
}

module.exports = app;
