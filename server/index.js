'use strict'

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

const config = require('../config.json')
const app = express()

app.use(bodyParser.json())
app.use(express.static('./node_modules')) // TODO: FIX angular2
app.use(express.static('./public'))

let auth = (req, res, next) => {
  jwt.verify(req.body.token, config.jwtSecret, (err, decoded) => {
    if (err) return res.json({ok: false, message: 'Invalid token'})
    req.decoded = decoded
    next()
  })
}

app.listen(config.PORT).on('listening', () => {
  console.log('Listening on %s', config.PORT)
})

app.get('/', (request, response) => {
  response.sendFile('./public/index.html')
})

app.post('/login', (req, res) => {
  if (req.body.password !== config.password) {
    return res.json({accepted: false})
  }

  jwt.sign({test: 'test'}, config.jwtSecret, null, (token) => {
    res.json({accepted: true, token})
  })
})

app.post('/kontroll', auth, (req, res) => {
  res.json({ok: true, decoded: req.decoded})
})

mongoose.connect(config.DB.URI, (err, db) => {
  if (err) throw err
  console.info('Connected to %s', config.DB.URI)
  process.send('server:started')
})
