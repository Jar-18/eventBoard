var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var lessSrc = './less';
var cssSrc = './public/stylesheets';
var cssDist = './public/dist/css';

gulp.task('less', function () {
  return gulp.src(lessSrc + '/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest(cssSrc));
});

gulp.task('minify-css', ['less'], function () {
  return gulp.src(cssSrc + '/**/*.css')
    .pipe(minifyCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(cssDist));
});

gulp.task('default', ['minify-css']);

gulp.watch(lessSrc + '/**/*.less', ['minify-css']);