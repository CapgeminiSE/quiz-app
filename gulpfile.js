var gulp = require('gulp')
var child_process = require('child_process')

gulp.task('dev', ['server'], function () {
  gulp.watch(
    [
      'index.js',
      'gulpfile.js',
      'config.json',
      'server/**/*'
    ],
    ['server'], {cwd: __dirname})
})

// Live restart on file change
var serverProcess
var starting = false

gulp.task('server', function (cb) {
  if (starting) return

  function fork () {
    console.info('Server %s', serverProcess ? 'restarting' : 'starting...')
    serverProcess = child_process.fork('.')

    serverProcess.once('exit', function (code) {
      if (cb) {
        starting = false
        serverProcess = null
        console.error('\nStart failed with code %d, waiting for file changes', code)
        cb()
        cb = null
      }
    })

    var onRunning = function () {
      serverProcess.removeListener('message', onRunning)
      if (cb) {
        starting = false
        // browserSync.reload()
        cb()
        cb = null
      }
    }

    serverProcess.on('message', function (msg) {
      if (msg === 'server:started') onRunning()
    })
  }

  if (!serverProcess) return fork()
  starting = true
  serverProcess.once('exit', fork)
  serverProcess.kill()
})
