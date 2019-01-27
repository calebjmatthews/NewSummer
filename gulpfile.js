const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('html', () => {
  return gulp.src('client/**/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('styles', () => {
  return gulp.src('client/**/*.css')
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', () => {
  return gulp.src('client/index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/'));
})

function watchFiles() {
  gulp.watch("./client/**/*.js", gulp.registry().get('scripts'));
  gulp.watch("./client/**/*.html", gulp.registry().get('html'));
  gulp.watch("./client/**/*.css", gulp.registry().get('styles'));
}

// build task
gulp.task('build', gulp.parallel('html', 'styles', 'scripts'));

// server
gulp.task('watch', watchFiles);