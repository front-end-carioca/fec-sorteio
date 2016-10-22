import gulp from 'gulp';

module.exports = () => {
  gulp.src('./index.html')
  .pipe(gulp.dest('dist/'))
}
