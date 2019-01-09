// npm i
// npm audit fix --force


// gsjson 1k2EgdCT3iSo_8hGwt_dOQvKwEpBcTIFe4wefljkrb5Q >> content/data.json -b

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');
var useref = require('gulp-useref');
var replace = require('gulp-replace');
var exec = require('child_process').exec;

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
const using = require('gulp-using');

var options = {
    batch : ['./src/components', './content/html/']
    }


var dst =       '_dist/';
var prebuild =  'prebuild';
var fScss=      'src/scss/**/*.scss';
var fHtml=      'src/**/*.html';
var fImages=    'src/images/**/*';
var fJs=        'src/js/**/*';
var fJson=      ['src/**/*.json', 'content/**/*.json'];
var fMd=         'content/**/*.md';

var siteJson = require('./content/data/site.json');


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

gulp.task('cleanJson', function () {
    return gulp.src(['content/data-links.json'], {read: false, allowEmpty: true})
        .pipe(plumber())
        .pipe(clean())
});

gulp.task('getJ', gulp.series('cleanJson', function (cb) {
  exec('gsjson 1k2EgdCT3iSo_8hGwt_dOQvKwEpBcTIFe4wefljkrb5Q >> content/data-links.json -b', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}))


gulp.task('clean', function () {
    return gulp.src(dst, {read: false})
        .pipe(plumber())
        .pipe(clean())
});


gulp.task('nav', function(done) {

  gulp.src('./src/templates/nav.html')
      .pipe(plumber())
      .pipe(handlebars(siteJson, options))
      .pipe(gulp.dest('src/components/'));
  done();
});



gulp.task('sass', function(){
  return gulp.src('./src/scss/*')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dst+'css'))
});



gulp.task('buildFromTemplates', function(done) {

  for(var i=0; i<siteJson.pages.length; i++) {
      var page = siteJson.pages[i],
          fileName = page.name.replace(/ +/g, '-').toLowerCase();
          template = page.template;

      gulp.src('./src/templates/'+template+'.html')
          .pipe(plumber())
          .pipe(handlebars(page, options))
          .pipe(rename(fileName + ".html"))
          .pipe(replace('src="d1h1-web-resources/image/', 'src="images/'))
          .pipe(replace('<!DOCTYPE html>', ''))
          .pipe(replace('<html xmlns="http://www.w3.org/1999/xhtml">', ''))
          .pipe(replace('<head>', ''))
          .pipe(replace('</head>', ''))
          .pipe(replace('<meta charset="utf-8" />', ''))
          .pipe(replace('<body id="d1h1" lang="nl-NL">', ''))
          .pipe(replace('</body>', ''))
          .pipe(replace('</html>', ''))
          .pipe(replace('<div', '<span'))
          .pipe(replace('</div>', '</span>'))
          .pipe(useref())
          .pipe(gulp.dest(dst))
          //.pipe(browserSync.stream());
  }
  done();
});


gulp.task('copyImg', function(){
  return gulp.src(fImages)
    .pipe(plumber())
    .pipe(gulp.dest(dst+'images'))
});




gulp.task('build',
  gulp.series('clean', 'sass', 'buildFromTemplates', 'copyImg',
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
