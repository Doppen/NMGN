// npm i
// npm audit fix --force

// npm install -g google-spreadsheet-to-json
// gulp getj
// gulp nav

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
var each = require('gulp-each');
var dom  = require('gulp-dom');

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


var siteJson = require('./content/data/sites.json');


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


// clear Json files en get new data from google docs
gulp.task('cleanJson', function () {
    return gulp.src(['content/data/links.json', 'content/data/sites.json', 'content/data/notes.json'], {read: false, allowEmpty: true})
        .pipe(plumber())
        .pipe(clean())
});

gulp.task('getJSite', function (cb) {
  exec('gsjson 1YAFTCWGrWyPjclnV16mR-S0-H2531DpOTfjCdESFSRk >> content/data/sites.json -b', function (err, stdout, stderr) { cb(err); });
})

gulp.task('getJLinks', function (cb) {
  exec('gsjson 1tzMeyKmoFMGbehWd1Q0hWbTceVf6IajMGX4r3NUqLA8 >> content/data/links.json -b', function (err, stdout, stderr) { cb(err); });
})

gulp.task('getJNotes', function (cb) {
  exec('gsjson 1U2daUDRZfhFHcrVujJxNcqFejs2Ui58zBSi8ThlMw50 >> content/data/notes.json -b', function (err, stdout, stderr) { cb(err); });
})

gulp.task('getj', gulp.series('cleanJson', 'getJSite', 'getJLinks', 'getJNotes',  function (done) {
  done();
}))

// gulp getj
// links 1tzMeyKmoFMGbehWd1Q0hWbTceVf6IajMGX4r3NUqLA8
// notes 1U2daUDRZfhFHcrVujJxNcqFejs2Ui58zBSi8ThlMw50
// site  1YAFTCWGrWyPjclnV16mR-S0-H2531DpOTfjCdESFSRk



gulp.task('clean', function () {
    return gulp.src(dst, {read: false})
        .pipe(plumber())
        .pipe(clean())
});



gulp.task('nav', function(done) {
  var navItems = {"items" : siteJson}

  gulp.src('./src/templates/nav.html')
      .pipe(plumber())
      .pipe(handlebars(navItems, options))
      .pipe(gulp.dest('src/components/'));
  done();
});



gulp.task('sass', function(){
  return gulp.src('./src/scss/*')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dst+'css'))
});




var linksJson = require('./content/data/links.json');


gulp.task('buildFromTemplates', function(done) {
  var page;
  var fileName;
  var template;

  for(var i=0; i<siteJson.length; i++) {
      page = siteJson[i];
      fileName = page.name; //.replace(/ +/g, '-').toLowerCase();
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
          .pipe(replace('<h2 class="Kop2">', '<h2>'))
          .pipe(replace('</div>', '</span>'))
          .pipe(each(function(content, file, callback) {
            var newContent = content;
            for(var j=0; j<linksJson.length; j++) {

              newContent = newContent.replace(linksJson[j].words_before_link, linksJson[j].words_before_link+' <a href="'+linksJson[j].url+'">');
              newContent = newContent.replace(linksJson[j].words_after_link, ' </a>'+linksJson[j].words_after_link);
            }

              callback(null, newContent);
          }))
          .pipe(dom(function(){
            this.querySelectorAll('.Author-s-')[0].remove();
            this.querySelectorAll('.Kop1--chapter-')[0].remove();
            this.querySelectorAll('h2')[0].className.replace(/\bKop2\b/,'');

        }))
          .pipe(useref())
          .pipe(gulp.dest(dst))
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
