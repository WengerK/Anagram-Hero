/* File: gulpfile.js */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('src/assets/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/assets/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('src/assets/scss/main.scss', ['sass']);
});
