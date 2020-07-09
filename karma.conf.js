// Karma configuration
// Generated on Wed Sep 23 2015 17:24:52 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '/',
    browsers: ['PhantomJS'],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
//     files: [
//       'app/vendor/jquery-2.1.4.min.js',
//       'app/vendor/lodash.min.js',
//       'app/vendor/backbone-min.js',
//       'app/vendor/**/*.js',
//       'app/templates/**/*.js',
//       'app/js/**/*.js',
//       'test/support/namespaces.js',
//       'test/support/vendor/**/*.js',
//       'test/factories/**/*.js',
//       'test/routes/routes.js',
//       'test/routes/**/*.js',
//       'test/**/*.js'
//     ],


    // list of files to exclude
   exclude: [
      // Exclude main module because it would interfere with the test-init module.
      'src/main.ts'
    ],
    proxies: {
      // Map requests to sources to the base path where Karma serves them.
      '/src/': '/base/src/'
    },
    preprocessors: {
      // Pass all TypeScript sources to the preprocessor.
      '**/*.ts': ['karma-typescript']
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true
  })
}
