	
var gulp = require("gulp");
    sass = require("gulp-sass");
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");
    browserSync = require("browser-sync").create();
    paths = {
      styles: {
        src: "scss/**/*.scss",
        dest: "css"
      },
      html: {
        src: "./*.html"
      },
    };

function style() {
  return (
    gulp
      .src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.styles.dest))
  );
}

exports.style = style; 

function reload(done) {
  browserSync.reload();
  done();
}

function watch() {
  style();
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(paths.styles.src, style)
  gulp.watch([paths.html.src, paths.styles.dest], reload);
}
  
exports.watch = watch