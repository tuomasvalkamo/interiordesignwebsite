const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
  // 1. where is my scss file
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', './src/scss/*.scss'])
    // 2. pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))
    // 3. where do I save the compiled CSS?
    .pipe(gulp.dest('./src/css/'))
    // 4. stream changes to all browsers
    .pipe(browserSync.stream());
}

// copy the bootstrap js files to /src/js folder
function js() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("./src/js"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './src/'
    }
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('node_modules/bootstrap/scss/bootstrap.scss', style);
  gulp.watch('./src/**/*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.js = js;
exports.watch = watch;