//'vendor'
import gulp from 'gulp';

module.exports = () => {
  return gulp.src(['assets/css/vendor/**/*'])
    .pipe(gulp.dest('dist/css/vendor/'));
};
