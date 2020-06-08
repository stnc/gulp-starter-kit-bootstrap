

//https://github.com/jr-cologne/gulp-starter-kit
//https://gist.github.com/crusat/ea7df56de21001762b10

const gulp = require('gulp'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  plumber = require('gulp-plumber'),
  minifyCss = require('gulp-clean-css'),
  babel = require('gulp-babel'),
  webpack = require('webpack-stream'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),

  browserSync = require('browser-sync').create(),
  src_folder = './src/',
  src_assets_folder = src_folder + 'assets/',
  dist_folder = './dist/',
  dist_assets_folder = dist_folder + 'assets/',
  node_modules_folder = './node_modules/',
  dist_node_modules_folder = dist_folder + 'node_modules/',
  node_dependencies = Object.keys(require('./package.json').dependencies || {});

gulp.task('clear', () => del([dist_folder]));

gulp.task('html', () => {
  return gulp.src([src_folder + '**/*.html'], {
    base: src_folder,
    since: gulp.lastRun('html')
  })
    .pipe(gulp.dest(dist_folder))
    .pipe(browserSync.stream());
});





gulp.task('js', () => {
  return gulp.src([
    // 'bower_components/jquery/dist/jquery.js', // if you need jquery, use  "bower install jquery"
    'bower_components/bootstrap/dist/js/bootstrap.js', // if you need bootstrap, use  "bower install bootstrap"
    src_assets_folder + 'js/**/*.js'
  ]
  /*,  since: gulp.lastRun('js') }*/
  )
  .pipe(sourcemaps.init())

    .pipe(plumber())
    // .pipe(webpack({
    //   mode: 'production'
    // }))
    .pipe(sourcemaps.init())
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
   

    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'})) // renaming file to myproject.min.js

    .pipe(gulp.dest(dist_assets_folder + 'js'))
    .pipe(browserSync.stream());
});




gulp.task('minify-css', () => {
  // Folder with files to minify
  return gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.css', // example with installed bootstrap package
    src_assets_folder + 'css/**/*.css'
  ])

  .pipe(concat('style.css'))
     .pipe(minifyCss({keepBreaks:false})) // minifying file
     .pipe(rename({suffix: '.min'})) // renaming file to myproject.min.css



    .pipe(gulp.dest(dist_assets_folder + 'css'))
});


gulp.task('images', () => {
  return gulp.src([src_assets_folder + 'images/**/*.+(png|jpg|jpeg|gif|svg|ico)'], { since: gulp.lastRun('images') })
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(dist_assets_folder + 'images'))
    .pipe(browserSync.stream());
});


gulp.task('vendor', () => {
  if (node_dependencies.length === 0) {
    return new Promise((resolve) => {
      console.log("No dependencies specified");
      resolve();
    });
  }

  return gulp.src(node_dependencies.map(dependency => node_modules_folder + dependency + '/**/*.*'), {
    base: node_modules_folder,
    since: gulp.lastRun('vendor')
  })
    .pipe(gulp.dest(dist_node_modules_folder))
    .pipe(browserSync.stream());
});

gulp.task('build', gulp.series('clear', 'html', 'js', 'minify-css', 'images', 'vendor'));

gulp.task('dev', gulp.series('html', 'minify-css', 'js'));

gulp.task('serve', () => {
  return browserSync.init({
    server: {
      baseDir: ['dist']
    },
    port: 3000,
    open: true
  });
});

gulp.task('watch', () => {
  const watchImages = [
    src_assets_folder + 'images/**/*.+(png|jpg|jpeg|gif|svg|ico)'
  ];

  const watchVendor = [];

  node_dependencies.forEach(dependency => {
    watchVendor.push(node_modules_folder + dependency + '/**/*.*');
  });

  const watch = [
    src_folder + '**/*.html',

    src_assets_folder + 'css/**/*.css',

    src_assets_folder + 'js/**/*.js'
  ];

  gulp.watch('./styles/*.css', function (evt) {
    gulp.task('minify-css');
  });

  gulp.watch(watch, gulp.series('dev')).on('change', browserSync.reload);
  gulp.watch(watchImages, gulp.series('images')).on('change', browserSync.reload);
  gulp.watch(watchVendor, gulp.series('vendor')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));