var gulp = require('gulp'),
  del = require('del'),
  KarmaServer = require('karma').Server,
  $ = require('gulp-load-plugins')(),
  webserver = require('gulp-webserver'),

  TEMPLATES_SRC = 'app/templates/**/*.hbs',
  TEMPLATES_DEST = 'app/templates/',
  TEMPLATES_FILE = 'templates.js',
  KARMA_CONF_PATH = __dirname + '/karma.conf.js';

// Run JS unit tests once
gulp.task('test', function (done) {
    var server = new KarmaServer({
        configFile: KARMA_CONF_PATH,
        browsers: ['Chrome'],
        singleRun: true
    }, done);
    server.start();
});

// Run JS unit tests in watch mode
gulp.task('tdd', function (done) {
    var server = new KarmaServer({
        configFile: KARMA_CONF_PATH,
        browsers: ['Chrome'],
        singleRun: false
    }, done);
    server.start();
});

// Compile templates
gulp.task('templates', ['clean-templates'], function () {
  return gulp.src([TEMPLATES_SRC])
    .pipe($.handlebars())
    .pipe($.defineModule('plain'))
    .pipe($.declare({
      namespace: 'App.templates'
    }))
    .pipe($.concat(TEMPLATES_FILE))
    .pipe(gulp.dest(TEMPLATES_DEST));
});

// Clean templates
gulp.task('clean-templates', function () {
  return del([TEMPLATES_DEST + TEMPLATES_FILE]);
});

// Start web server
gulp.task('server', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: false,
      directoryListing: true,
      open: false
    }));
});

// Default task
gulp.task('default', ['templates']);
