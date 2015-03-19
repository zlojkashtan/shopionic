var gulp = require('gulp');
var buildConfig = require('./config/build.config.js');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');

gulp.task('default', function() {
  return gulp.src(buildConfig.shopIonicFiles)
    .pipe(header(buildConfig.banner))
    .pipe(concat('shopIonic.js'))
    .pipe(gulp.dest(buildConfig.dist + '/js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(buildConfig.dist + '/js'));
});
