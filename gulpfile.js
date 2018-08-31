var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
const using = require('gulp-using');

var options = {
    batch : './src/components'
    }


var dst =       'dist/';
var prebuild =  'prebuild';
var fScss=      'src/scss/**/*.scss';
var fHtml=      'src/**/*.html';
var fImages=    'src/images/**/*';
var fJs=        'src/js/**/*';
var fJson=      'src/**/*.json';
var fMd=         'content/**/*.md';




gulp.task('browserSync', function() {
  browserSync.init({
    //proxy: "http://localhost:8888/wp-huc"
    server: {
      baseDir: dst
    },
    browser: ["google chrome"], //, "firefox"
  })
})

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('clean', function () {
    return gulp.src(dst, {read: false})
        .pipe(plumber())
        .pipe(clean())
});


gulp.task('sass', function(){
  return gulp.src('./src/scss/*')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dst+'css'))
});

var siteJson = require('./content/data/site.json');

gulp.task('buildFromTemplates', function(done) {

  for(var i=0; i<siteJson.pages.length; i++) {
      var page = siteJson.pages[i],
          fileName = page.name.replace(/ +/g, '-').toLowerCase();
          template = page.template;

      gulp.src('./src/templates/'+template+'.html')
          .pipe(plumber())
          .pipe(handlebars(page, options))
          .pipe(rename(fileName + ".html"))
          .pipe(gulp.dest(dst))
          .pipe(browserSync.stream());
  }
  done();

});







// gulp.task('watch', function (){
//   gulp.watch([fHtml, fScss, fJs, fJson, fMd], gulp.series( 'clean', 'sass', 'buildFromTemplates', browserSync.reload, 'watch'));
//  });


// var watcher = gulp.watch([fHtml, fScss, fJs, fJson, fMd] /* You can also pass options and/or a task function here */);
// watcher.on('all', function(event, path, stats) {
//   console.log('File ' + path + ' was ' + event + ', running tasks...');
//   gulp.series( 'clean', 'sass', 'buildFromTemplates', browserSync.reload);
// });


gulp.task('build',
  gulp.series('clean', 'sass', 'buildFromTemplates',
  function(done) {
      done();
  }
));


gulp.task('watch', function () {
  gulp.watch([[fHtml, fScss, fJs, fJson, fMd]
  ], gulp.series('build'));
});



gulp.task('default',
  gulp.series('build', gulp.parallel('browserSync','watch'),
  function(done) {
      done();
  }

));





//gulp.task('watch', function (){
//   gulp.watch([fHtml, fScss, fJs, fJson, fMd], ['distAssets']);
//   gulp.watch([fHtml, fScss, fJs, fJson, fMd], browserSync.reload);


//gulp.task('default', ['watch']);
