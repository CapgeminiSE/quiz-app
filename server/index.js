'use strict'

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const config = require('../config.json')
const app = express()

app.use(bodyParser.json())
app.use(express.static('./public'))

app.listen(config.PORT).on('listening', () => {
  console.log('Listening on %s', config.PORT)
})

app.get('/', (request, response) => {
  response.sendFile('./public/index.html')
})

app.post('/login', (req, res) => {
  if (req.body.password === config.password) res.json({accepted: true})
  else res.json({accepted: false})
})

mongoose.connect(config.DB.URI, (err, db) => {
  if (err) throw err
  console.info('Connected to %s', config.DB.URI)
  process.send('server:started')
})
