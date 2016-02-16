'use strict'

import express from 'express'
import mongoose from 'mongoose'
import {QuizQuestion} from '../models/quiz'
const config = require('../config.json')
const app = express()

app.listen(config.PORT).on('listening', () => {
    console.log('Listening on %s', config.PORT);
})

app.get('*', (request, response) => {
    response.send('Hello world');
})

mongoose.connect(config.DB.URI, (err, db) => {
    if (err) throw err
    console.info('Connected to %s', config.DB.URI)
})
