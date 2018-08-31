var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    plumber = require('gulp-plumber'),
    md   = require('gulp-remarkable'),
    imageResize = require('gulp-image-resize'),
    replace = require('gulp-replace');
var browserSync = require('browser-sync').create();
const using = require('gulp-using');

// DATA
//var siteJson = require('./content/data/site.json');

var options = {
    batch : ['./src/components', './prebuild']
    }

//files
var dst = '_dist';
var prebuild = 'prebuild';
var fScss= 'src/scss/**/*.scss';
var fHtml= 'src/**/*.html';
var fImages= 'src/images/**/*';
var fJs= 'src/js/**/*';
var fJson= 'src/**/*.json';
var fMd= 'content/**/*.md';



//browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '_dist'
    },
    browser: ["google chrome"], //, "firefox"
  })
})



////////////////    IMAGES

gulp.task('images-big', function () {
  return gulp.src(['content/images/**/*', '!content/images/**/*.svg'])
    .pipe(using())
    .pipe(imageResize({
      width : 1000,
      quality: .92,
      noProfile: true
    }))
    .pipe(gulp.dest(prebuild+'/images/content'))
});


gulp.task('images-small', ['images-big'], function () {
  return gulp.src(['content/images/**/*', '!content/images/**/*.svg'])
    .pipe(using())
    .pipe(imageResize({
      width : 300, //300
      quality: .7,
      noProfile: true
    }))
    .pipe(rename(function (path) {
      path.basename += "-small";
    }))
    .pipe(gulp.dest(prebuild+'/images/content'))

});

gulp.task('img', ['images-small'], function () {
});






//////////////////   SITE BUILD

  // clean all previous output
gulp.task('clean', function () {
    return gulp.src([dst], {read: false})
        .pipe(plumber())
        .pipe(clean({force: true}))
});




//create css from sass
gulp.task('sass', ['clean'], function() {
  return gulp.src(fScss)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dst+'/css'))

});

gulp.task('buildFromTemplates', ['sass'], function() {

            var pge = "";

            gulp.src('./src/templates/basic.html')
                .pipe(plumber())
                .pipe(handlebars(pge, options))
                .pipe(rename("index.html"))
                .pipe(gulp.dest('./_dist'));

});


gulp.task('distAssets',['buildFromTemplates'], function() {
  gulp.src([fJs])
  .pipe(gulp.dest(dst+'/js'))

  gulp.src([fImages])
  .pipe(gulp.dest(dst+'/images'))


  gulp.src(['content/images/*.svg'])
  .pipe(gulp.dest(dst+'/images/content'))
})



// watch
gulp.task('watch', ['distAssets', 'browserSync'], function (){
  gulp.watch([fHtml, fScss, fJs, fJson, fMd], ['distAssets']);
  gulp.watch([fHtml, fScss, fJs, fJson, fMd], browserSync.reload);
});


gulp.task('default', ['watch']);
gulp.task('build', ['distAssets']);
