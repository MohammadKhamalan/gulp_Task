const gulp = require('gulp');
const replace = require('gulp-replace');
const scss = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

const footerHtml = '<footer><a href="index.html">Back</a></footer>';
const headerhtml='<header><h1>Welcome to gulp Task</h1></header>'
gulp.task('inject-footer', function () {
    return gulp.src([
      'C:\\Users\\ASUS\\Desktop\\gulp-project\\index.html',

        'C:\\Users\\ASUS\\Desktop\\gulp-project\\HomeTown.html',
        'C:\\Users\\ASUS\\Desktop\\gulp-project\\university.html',
        'C:\\Users\\ASUS\\Desktop\\gulp-project\\aboutme.html'
    ])
    .pipe(replace('<!-- <footer-placeholder> -->', footerHtml))
    .pipe(replace('<!-- <header-placeholder> -->', headerhtml))

    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});



gulp.task('minify-scss', () => {
    return gulp.src([
        'C:\\Users\\ASUS\\Desktop\\gulp-project\\*.scss' 
    ])
    .pipe(scss().on('error', scss.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream()); 
});
gulp.task('export-images', () => {
  return gulp.src([
    'C:\\Users\\ASUS\\Desktop\\gulp-project\\Capture.PNG',
    'C:\\Users\\ASUS\\Desktop\\gulp-project\\Capture1.PNG',
    'C:\\Users\\ASUS\\Desktop\\gulp-project\\Capture2.PNG',
    'C:\\Users\\ASUS\\Desktop\\gulp-project\\Capture3.PNG',
    'C:\\Users\\ASUS\\Desktop\\gulp-project\\Capture4.PNG',
    'C:\\Users\\ASUS\\Desktop\\gulp-project\\Capture6.PNG'
])

  .pipe(gulp.dest('dist/images'));
});
gulp.task('minify-js', () => {
  return gulp.src([
    'C:\\Users\\ASUS\\Desktop\\gulp-project\\button.js' 
  ])
  .pipe(concat('combined.js'))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' })) 
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream()); 
});
gulp.task('serve', () => {
  browserSync.init({
      server: {
          baseDir: './'
      }
  });

  gulp.watch([
      'C:\\Users\\ASUS\\Desktop\\gulp-project\\*.html',
      'C:\\Users\\ASUS\\Desktop\\gulp-project\\*.scss',
  ], gulp.series('inject-footer', 'minify-scss')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('inject-footer', 'minify-scss', 'minify-js', 'export-images', 'serve'));
