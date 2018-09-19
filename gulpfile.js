/**
 * @desc this task runner will concatenate and minifiy the application scripts and styles
 * @author Neil Symester neil.symester@towergate.co.uk
 */

// set environment variable
// Powershell => $env:NODE_ENV='production'
// bash => NODE_ENV=production
// MSDOS => SET NODE_ENV=production

// process.argv[0] = node.exe
// process.argv[1] = gulp.js

// Gulp.js configuration
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// load all plugins in 'devDependencies' into the variable $
// pattern: include '*' for non gulp files
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', '*'],
  replaceString: /\bgulp[-.]/,
  rename: {
    'gulp-strip-debug': 'stripdebug',
    'gulp-nunjucks-render': 'nunjucksRender',
    'run-sequence': 'runSequence',
    'vinyl-source-stream': 'source',
    'vinyl-buffer': 'buffer',
    'event-stream': 'es'
  },
  scope: ['devDependencies']
});

// is this a development build?
var devBuild = (process.env.NODE_ENV !== 'production');

var isWin = process.platform === 'win32';

// folders
var folder = {
  src: 'src/',
  build: ''
};

var sass = {
  style: 'nested',
  comments: false
};

var onError = function (err) {
  // $.gutil.beep();
  console.log(err);
};

/* ===================== START ===================== */

/**
 * @desc browserSync, start the server
 */
gulp.task('browserSync', function () {
  // check for operating system
  // - for WINDOWS 10 use "Chrome"
  // - for MAC OS X use 'Google Chrome'
  var browser = isWin ? 'Chrome' : 'Google Chrome';
  browserSync.init({
    server: {
      baseDir: './build'
    },
    browser: browser,
    directory: false
  });
});

/**
 * @desc nunjucks task
 */
gulp.task('nunjucks', function () {
  // Gets .html and .nunjucks files in pages
  return gulp.src('./src/pages/**/*.+(html|njk)')
    .pipe($.plumber({
      errorHandler: onError
    }))
  // Renders template with nunjucks
    .pipe($.nunjucksRender({
      path: ['./src/templates']
    }))
  // output files in app folder
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

/**
 * @desc css task - compile sass to css, compress and add prefixes
 */
gulp.task('css', function () {
  var postCssOpts = [
    $.autoprefixer({ browsers: ['last 2 versions', '> 2%'] })
  ];

  if (!devBuild) {
    console.log('css build ', devBuild);
    sass.style = 'compressed';
    sass.comments = false;
  }

  // .on('error', $.util.log))

  return gulp.src([`${folder.src}/stylesheets/sass/*.scss`])
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.if(devBuild, $.sourcemaps.init()))
    .pipe($.sass({
      outputStyle: sass.style,
      sourceComments: false,
      imagePath: 'images/',
      errLogToConsole: true
    })
      .on('error', function (err) {
        console.log(err.toString());

        this.emit('end');
      }))
    .pipe($.postcss(postCssOpts))
    .pipe($.if(devBuild, $.sourcemaps.write('maps', {
      includeContent: false
    })))
    .pipe(gulp.dest('build/css'))
    .pipe($.size())
    .pipe(browserSync.stream());
});

/**
 * @desc bundles js into multiple files
 */
gulp.task('browserify', function () {
  var files = [
    './src/scripts/index.js'
    // './src/scripts/application.js'
  ];

  // start fresh
  // $.del.sync([`${files}`]);

  // map them to our stream function
  var tasks = files.map(function (entry) {
    console.log(entry);
    return $.browserify({
      entries: [entry], // Entry point
      debug: true // Output source maps
    })
      .transform($.babelify, {
        presets: ['env']
      })
      .bundle().on('error', function (err) {
        // print the error (can replace with gulp-util)
        console.log(err.message);
        // end this stream
        this.emit('end');
      })
      .pipe($.source(entry)) // gives streaming vinyl file object
      // rename them to have "bundle as postfix"
      .pipe($.rename({
        dirname: '', // don't include full path
        extname: '.bundle.js' // Output file
      }))
      .pipe($.buffer()) // <----- convert from streaming to buffered vinyl file object
      .pipe($.uglify()) // uglify
      .pipe(gulp.dest('build/js')) // Output path
      .pipe(reload({
        stream: true,
        once: true
      }));
  });
  // create a merged stream
  return $.es.merge.apply(null, tasks);
});

/**
 * @desc bundles js into multiple files and watches for changes
 */
gulp.task('watchify', function () {
  let files = [
    './src/scripts/index.js'
    // './src/scripts/application.js'
  ];

  // start fresh
  // $.del.sync([`${files}`]);

  var tasks = files.map(function (entry) {
    var bundler = $.browserify({
      entries: [entry], // Entry point
      debug: true // Output source maps
    }).transform($.babelify, {
      presets: ['env']
    });

    var bundle = function () {
      return bundler
        .bundle() // Start bundle
        .on('error', function (err) {
          // print the error (can replace with gulp-util)
          console.log(err.message);
          // end this stream
          this.emit('end');
        })
        .pipe($.source(entry))
      // rename them to have "bundle as postfix"
        .pipe($.rename({
          dirname: '', // don't include full path
          extname: '.bundle.js' // Output file
        }))
        .pipe(gulp.dest('build/js')) // Output path
        .pipe(reload({
          stream: true,
          once: true
        }));
    };

    bundler = $.watchify(bundler);
    bundler.on('update', bundle);

    return bundle();
  });

  // create a merged stream
  return $.es.merge.apply(null, tasks);
});

/**
 * @desc bootlint task -  A gulp wrapper for Bootlint, the HTML linter for Bootstrap projects
 */
gulp.task('bootlint', function () {
  return gulp.src('./build/*.html')
    .pipe($.bootlint());
});

/**
 * @desc build - run all tasks
 */
gulp.task('build', function (callback) {
  $.runSequence(['nunjucks', 'css', 'browserify'],
    callback);
});

/**
 * @desc watch - watch for changes
 */
gulp.task('watch', ['watchify'], function () {
  // html changes
  gulp.watch('*.html', browserSync.stream());

  // nunjuck changes
  gulp.watch(folder.src + '+(pages|templates)/**/*.njk', ['nunjucks']);

  // css changes
  gulp.watch(folder.src + 'stylesheets/sass/*', ['css']);
});

/**
 * @desc default task
 */
gulp.task('default', function (callback) {
  $.runSequence(['nunjucks', 'css', 'browserSync', 'watch'],
    callback);
});
