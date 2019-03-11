// npm i
// npm audit fix --force

// npm install -g google-spreadsheet-to-json
// gulp getj
// gulp nav
// gulp convHtml

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
var mammoth = require("mammoth");
var writeFile = require('write-file');
//var docxHtmlConverter = require('gulp-docx-converter');

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
var allImgStr = 'not working';


var siteJson = require('./content/data/sites.json');

// Create HTML
function createHtml(fileName) {
  mammoth.convertToHtml({path: "content/word/"+fileName+".docx", outputDir: "content/html/"})
      .then(function(result){
          htmlOut = result.value; // The generated HTML
          messages = result.messages; // Any messages, such as warnings during conversion
          //console.log(htmlOut);
          fs.writeFileSync('content/html/'+fileName+'.html', htmlOut)
      })
}

// gulp convHtml
gulp.task('convHtml', function (done) {
  var htmlOut='qqq';
  var messages;
  fs = require('fs');

  for(var ii=0; ii<siteJson.length; ii++) {
      page = siteJson[ii];
      fileName = page.content;
      createHtml(fileName);
      }
done();
});



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
    return gulp.src(['content/data/links.json', 'content/data/sites.json', 'content/data/notes.json', 'content/data/images.json'], {read: false, allowEmpty: true})
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

gulp.task('getJImages', function (cb) {
exec('gsjson 15B_aMTtiGuokP1KP6Iu09RNr4X3ZZQyO-Qp1dq8eg7I >> content/data/images.json -b', function (err, stdout, stderr) { cb(err); });
})

gulp.task('getj', gulp.series('cleanJson', 'getJSite', 'getJLinks', 'getJNotes', 'getJImages',  function (done) {
  done();
}))

// gulp getj
// links  1tzMeyKmoFMGbehWd1Q0hWbTceVf6IajMGX4r3NUqLA8
// notes  1U2daUDRZfhFHcrVujJxNcqFejs2Ui58zBSi8ThlMw50
// site   1YAFTCWGrWyPjclnV16mR-S0-H2531DpOTfjCdESFSRk
// images 15B_aMTtiGuokP1KP6Iu09RNr4X3ZZQyO-Qp1dq8eg7I

// npm mammoth d1h1.docx output.html


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




//var linksJson = require('./content/data/links.json');
var notesJson = require('./content/data/notes.json');
var imagesJson = require('./content/data/images.json');

gulp.task('buildFromTemplates', function(done) {
  var page;
  var fileName;
  var template;
  var messages;
  var pageId;

  for(var i=0; i<siteJson.length; i++) {
      page = siteJson[i];
      fileName = page.name; //.replace(/ +/g, '-').toLowerCase();
      template = page.template;
      pageId = page.id;

      gulp.src('./src/templates/'+template+'.html')
          .pipe(plumber())
          .pipe(handlebars(page, options))
          .pipe(rename(fileName + ".html"))
          .pipe(replace('|', '<br>'))
          .pipe(replace('">[', '">'))
          .pipe(replace(']</a>', '</a>'))
          .pipe(replace('<sup>', '<span class="noot">'))
          .pipe(replace('</sup>', '</span>'))
          .pipe(replace('<p>[[[', '<div class="inlineImgRow">[[['))
          .pipe(replace('</span> [[[', '<div class="inlineImgRow">[[['))
          .pipe(replace(']]]</p>', ']]]</div>'))
          .pipe(replace(']]] </p>', ']]]</div>'))
          .pipe(replace('<ol><li id="endnote-1">', '<div class="notesList"><h2>Noten</h2><ol><li id="endnote-1">'))
          .pipe(each(function(content, file, callback) {
            var newContent = content;

            //replace links
            // for(var j=0; j<linksJson.length; j++) {
            //   newContent = newContent.replace(linksJson[j].words_before_link, linksJson[j].words_before_link+' <a href="'+linksJson[j].url+'">');
            //   newContent = newContent.replace(linksJson[j].words_after_link, ' </a>'+linksJson[j].words_after_link);
            // }

            for(var k=0; k<imagesJson.length; k++) {
              //replace images



              newContent = newContent.replace('[[['+imagesJson[k].filename, '<div class="inlineImage" id="'+imagesJson[k].filename+'"><img src="images/'+imagesJson[k].filename);
              newContent = newContent.replace(imagesJson[k].filename+']]]', imagesJson[k].filename+'">'+'<div class="caption">'+ifEmp(imagesJson[k].caption1, '', '')+'<span class="openCaption">[i]</span>'+'<div class="moreCaption">'+ifEmp(imagesJson[k].caption2, '<br>', '')
+ifEmp(imagesJson[k].caption3, '<br>', '')+ifEmp(imagesJson[k].caption4, '<br>', '')+'</div></div></div>');


              // fill images array for scroll
              if (imagesJson[k].filename!= undefined) {
                newContent = newContent.replace('******', "'"+imagesJson[k].filename+"',******")
              }


            }


              callback(null, newContent);
          }))
          .pipe(replace(',******', ''))
          .pipe(dom(function(){
            // remove <br> in title
            var title = this.getElementsByTagName("title")[0].innerHTML;
            this.getElementsByTagName("title")[0].innerHTML = title.replace('&lt;br&gt;',' ');


            for(var l=0; l<notesJson.length; l++) {

              // notes to long notes
              this.getElementById('endnote-'+notesJson[l].note_number).innerHTML = notesJson[l].longNote+ifEmp(notesJson[l].extra, '<br>');
              this.getElementById('endnote-'+notesJson[l].note_number).innerHTML += ifEmp(notesJson[l].worldcat, '<br><a href="', '" target="_blank">See on worldcat.org</a>');
              this.getElementById('endnote-'+notesJson[l].note_number).innerHTML += ifEmp(notesJson[l].worldcatTitel2, '<br><a href="', '" target="_blank">See on worldcat.org</a>');
              this.getElementById('endnote-'+notesJson[l].note_number).innerHTML += ifEmp(notesJson[l].worldcatTitel3, '<br><a href="', '" target="_blank">See on worldcat.org</a>');
              this.getElementById('endnote-'+notesJson[l].note_number).innerHTML += ifEmp(notesJson[l].worldcatTitel4, '<br><a href="', '" target="_blank">See on worldcat.org</a>');
              this.getElementById('endnote-'+notesJson[l].note_number).innerHTML += ifEmp(notesJson[l].worldcatTitel5, '<br><a href="', '" target="_blank">See on worldcat.org</a>');
            }


        }))
          .pipe(useref())
          .pipe(gulp.dest(dst))
          .pipe(browserSync.stream());
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
  gulp.watch([[fHtml, fScss, fJs, fJson, fMd]], gulp.series('build'));
});



gulp.task('default',
  gulp.series('build', gulp.parallel('browserSync','watch'),
  function(done) {
      done();
  }

));


function ifEmp(input, pre, post) {
  if(input != undefined) {
    return pre+input+post;
  }else {
    return '';
  }
}
