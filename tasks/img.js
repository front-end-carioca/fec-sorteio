import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

module.exports = () => {
  return gulp
    .src(['assets/img/**/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'));
};
