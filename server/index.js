'use strict'

import express from 'express'
const config = require('../config.json')
const app = express()

app.listen(config.PORT).on('listening', () => {
    console.log('Server listen on 8080');
})

app.get('*', (request, response) => {
    response.send('Hello world');
})
