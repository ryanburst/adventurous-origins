var gulp         = require('gulp');
var watch        = require('gulp-watch');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
var concat       = require('gulp-concat');
var imagemin     = require('gulp-imagemin');
var clean        = require('gulp-clean');


gulp.task('css', function () {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function () {
  return gulp.src([
      './src/scripts/plugins.js',
      './src/scripts/main.js',
      './src/scripts/data/*.js',
      './src/scripts/Generator/*.js',
      './src/scripts/Generator/CharacterAttributes/*.js',
    ])
    .pipe(concat('adventurous-origins.js'))
    /*.pipe(babel({
      presets: ['es2015']
    }))*/
    .pipe(gulp.dest('./dist/js'));
});


gulp.task('copy', function() {
  return gulp.src('./src/statics/**/**')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('docs', function() {
  return gulp.src('./dist/**/**')
    .pipe(gulp.dest('./docs/'));
});

gulp.task('clean', function () {
  return gulp.src(['./dist','./docs'], {read: false})
      .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch('./src/scss/**/**', gulp.series('css','docs'));
  gulp.watch('./src/scripts/**/*.js', gulp.series('scripts','docs'));
  gulp.watch('./src/statics/**/**', gulp.series('copy','docs'));
});

gulp.task('default', gulp.series('css','scripts','copy','docs'));
gulp.task('build',gulp.series('clean',function() {
  gulp.start('default');
}));
