const gulp = require('gulp');
const ts = require('gulp-typescript');

var tsServerProject = ts.createProject('tsconfig.json');
var tsClientProject = ts.createProject('tsconfig.json');

gulp.task('html', () => {
  return gulp.src('source/client/**/*.html')
    .pipe(gulp.dest('dist/client'));
});

gulp.task('styles', () => {
  return gulp.src('source/client/**/*.css')
    .pipe(gulp.dest('dist/client'));
});

gulp.task('scripts-server', () => {
  return gulp.src('source/server/**/*.ts')
    .pipe(tsServerProject())
    .pipe(gulp.dest('dist/server'));
})

gulp.task('scripts-client', () => {
  return gulp.src('source/client/**/*.ts')
    .pipe(tsClientProject())
    .pipe(gulp.dest('dist/client'));
})

function watchFiles() {
  gulp.watch("./source/server/**/*.ts", gulp.registry().get('scripts-server'));
  gulp.watch("./source/client/**/*.ts", gulp.registry().get('scripts-client'));
  gulp.watch("./source/client/**/*.html", gulp.registry().get('html'));
  gulp.watch("./source/client/**/*.css", gulp.registry().get('styles'));
}

// build task
gulp.task('build', gulp.parallel('html', 'styles', 'scripts-server',
  'scripts-client'));

// server
gulp.task('watch', watchFiles);
