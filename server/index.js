'use strict'

import express from 'express'
import mongoose from 'mongoose'
const config = require('../config.json')
const app = express()

app.use(express.static('./public'))

app.listen(config.PORT).on('listening', () => {
  console.log('Listening on %s', config.PORT)
})

app.get('/', (request, response) => {
  response.sendFile('./public/index.html')
})

mongoose.connect(config.DB.URI, (err, db) => {
  if (err) throw err
  console.info('Connected to %s', config.DB.URI)
  process.send('server:started')
})
