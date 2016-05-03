'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var webpack = require('webpack-stream');

var $ = require('gulp-load-plugins')();

var web = require('webpack');
var commonsPlugin = new web.optimize.CommonsChunkPlugin('common.js');
// var commonResourcePlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

function webpackWrapper(watch, test, callback) {
  var webpackOptions = {
    watch: watch,
    module: {
      preLoaders: [{test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}],
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader?presets[]=es2015']},
        {test: /\.html$/, exclude: /node_modules/, loader: "html!html-minify"},
        {test: /\.scss$/, loaders: ["style", "css", "sass"]},
        {test: /\.css$/, loader: "style-loader!css-loader"},
      ],
      plugins: [
        commonsPlugin
        // new web.optimize.CommonsChunkPlugin('common.js')
        // new commonResourcePlugin("./js/commons.chunk.js")
      ]
    },
    'html-minify-loader': {
      empty: true,        // KEEP empty attributes
      cdata: true,        // KEEP CDATA from scripts
      comments: true,     // KEEP comments
      dom: {                            // options of !(htmlparser2)[https://github.com/fb55/htmlparser2]
        lowerCaseAttributeNames: false,      // do not call .toLowerCase for each attribute name (Angular2 use camelCase attributes)
      }
    },
    // output: {filename: 'index.module.js'}
    output: {
      path: path.join(__dirname, "js"),
      // path: '../',
      filename: "index.module.js",
      chunkFilename: "../[id]-[name]-[chunkhash:8].chunk.js"
    },
  };

  if (watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function (err, stats) {
    if (err) {
      conf.errorHandler('Webpack')(err);
    }
    $.util.log(stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    browserSync.reload();
    if (watch) {
      watch = false;
      callback();
    }
  };

  var sources = [path.join(conf.paths.src, '/app/index.module.js')];
  if (test) {
    sources.push(path.join(conf.paths.src, '/app/**/*.spec.js'));
  }

  return gulp.src(sources)
    .pipe(webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('scripts', function () {
  return webpackWrapper(false, false);
});

gulp.task('scripts:watch', ['scripts'], function (callback) {
  return webpackWrapper(true, false, callback);
});

gulp.task('scripts:test', function () {
  return webpackWrapper(false, true);
});

gulp.task('scripts:test-watch', ['scripts'], function (callback) {
  return webpackWrapper(true, true, callback);
});
