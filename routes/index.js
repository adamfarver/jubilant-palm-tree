'use strict'
const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', function(req, res, next) {
	async function findBook(isbn) {
		try {
			let response = await axios.get(
				`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=JSON&jscmd=data`
			)
			const isbnLookup = `ISBN:${isbn}`

			response = await response.data

			let transformResponse = await Object(response[`${isbnLookup}`])
			console.log('book found')

			return transformResponse
		} catch (e) {
			throw Error(e)
		}
	}

	findBook('0316420263').then(response => {
		const status = 200
		res.send(response)
		res.status(status)
		res.end()
		console.log('Got /')
	})
})

module.exports = router
