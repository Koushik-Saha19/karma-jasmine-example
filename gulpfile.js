var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  webserver = require('gulp-webserver'),

  TEMPLATES_SRC = 'app/templates/**/*.hbs',
  TEMPLATES_DEST = 'app/templates/',
  TEMPLATES_FILE = 'templates.js';

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

gulp.task('clean-templates', function () {
  gulp.src(TEMPLATES_DEST + TEMPLATES_FILE, { read: false })
    .pipe($.rimraf());
});

gulp.task('server', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: false,
      directoryListing: true,
      open: false
    }));
});

gulp.task('default', function() {
  // place code for your default task here
});
