'use strict'
const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const routes = require('./routes/index')

const app = express()
const port = 3001

mongoose.connect('mongodb://localhost:27017/node-axios-test', {
	useNewUrlParser: true,
	useCreateIndex: true,
})
var db = mongoose.connection
// Error Handler
db.on('error', console.error.bind(console, 'Connection error:'))

app.listen(port, () => console.log("I'm listening foo!"))

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('File Not Found')
	err.status = 404
	next(err)
})

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
	res.status(err.status || 500)
	res.render('error', {
		message: err.message,
		error: {},
	})
})
