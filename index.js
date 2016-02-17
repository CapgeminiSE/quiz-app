require('babel-register')
var fs = require('fs')
var join = require('path').join

// Load all models first
fs.readdirSync(join(__dirname, 'server/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'server/models', file))
})

require('./server/')
