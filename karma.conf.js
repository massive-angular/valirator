var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');

module.exports = function (config) {
  var configuration = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'dist/*.js',
      'test/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
      'node_modules/'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.spec.js': ['rollup']
    },
    rollupPreprocessor: {
      plugins: [
        commonjs({
          include: 'node_modules/**',
          extensions: [
            '.js'
          ]
        }),
        nodeResolve({
          jsnext: true,
          main: true,
          browser: true,
          extensions: [
            '.js'
          ]
        }),
        babel({
          runtimeHelpers: true,
          exclude: 'node_modules/**',
          plugins: ['transform-runtime']
        })
      ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  if (process.env.NODE_ENV === 'testing') {
    configuration.singleRun = true;
    configuration.autoWatch = false;
    configuration.browsers = ['PhantomJS'];
  }

  config.set(configuration);
};
