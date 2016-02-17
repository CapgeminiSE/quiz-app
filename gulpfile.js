var gulp = require('gulp')
var minify = require('gulp-minify')
var concat = require('gulp-concat')
var child_process = require('child_process')

gulp.task('post-install', ['bundle-lib'], function (callback) { callback() })
gulp.task('bundle-lib', function () {
  return gulp.src(
    [
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js'
    ])
    .pipe(gulp.dest('public/js/lib'))
})

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
