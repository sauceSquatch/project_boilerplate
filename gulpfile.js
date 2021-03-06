var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var htmlSources = ['src/*.html'],
    outputDir = 'deploy';

var sassSources = [
  'src/sass/*.sass',
  'src/sass/*.scss'
]

var jsSources = [
  'src/lib/*.js',
  'src/lib/greensock/TweenLite.js',
  'src/lib/greensock/easing/EasePack.js',
  'src/lib/greensock/plugins/CSSPlugin.js',
  'src/scripts/*.js'
];

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload())
});

gulp.task('sass', function() {
  gulp.src(sassSources)
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest(outputDir + "/css"))
  .pipe(connect.reload())
});

gulp.task('js', function() {
  gulp.src(jsSources)
  // .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest(outputDir + "/js"))
  .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'deploy/',
    port: 1111,
    livereload: true
  })
});

gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);
