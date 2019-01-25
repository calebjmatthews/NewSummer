const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const historyApiFallback = require('connect-history-api-fallback');
const watch = require('gulp-watch');
const ts = require('gulp-typescript');

var tsServerProject = ts.createProject('tsconfig.json');
var tsClientProject = ts.createProject('tsconfig.json');

gulp.task('html', (done) => {
  return gulp.src('source/client/**/*.html')
    .pipe(gulp.dest('dist/client'));
});

gulp.task('styles', (done) => {
  return gulp.src('source/client/**/*.css')
    .pipe(gulp.dest('dist/client'));
});

gulp.task('scripts-server', (done) => {
  return gulp.src('source/server/**/*.ts')
    .pipe(tsServerProject())
    .pipe(gulp.dest('dist/server'));
})

gulp.task('scripts-client', (done) => {
  return gulp.src('source/client/**/*.ts')
    .pipe(tsClientProject())
    .pipe(gulp.dest('dist/client'));
})

gulp.task('watch', (done) => {
  watch('client/**/*.ts', (done) => {
    gulp.start('scripts-server');
    browserSync.reload();
  });

  watch('client/**/*.html', (done) => {
    gulp.start('html');
    browserSync.reload();
  });

  watch('server/**/*.ts', (done) => {
    gulp.start('scripts');
    browserSync.reload();
  });
});

gulp.task('browser-sync', (done) => {
  browserSync.init({
      server: {
          baseDir: './dist',
      },
      middleware : [historyApiFallback()]
  });
  done();
});

// build task
gulp.task('build', gulp.parallel('html', 'styles', 'scripts-server',
  'scripts-client'));

// server
gulp.task('serve', gulp.series('build', 'watch'));
