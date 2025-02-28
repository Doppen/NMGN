// npm i
// npm audit fix --force

// npm install -g google-spreadsheet-to-json

// node getj.js                    update all json files
// gulp nav                     update page navigation (new titles)
// gulp BuildIndexFromHTML      update the search index
// gulp convHtml
// node img

// gulp BuildIndexFromHTML      update the search index
// gulp buildSearchIndex

// gsjson 1k2EgdCT3iSo_8hGwt_dOQvKwEpBcTIFe4wefljkrb5Q >> content/data.json -b

var gulp = require('gulp');
//var sass = require('gulp-sass');
//var sass = require('gulp-sass')(require('node-sass'))
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');
var useref = require('gulp-useref');
var replace = require('gulp-replace');
//var exec = require('child_process').exec;
var each = require('gulp-each');
var dom  = require('gulp-dom');
var mammoth = require("mammoth");
var writeFile = require('write-file');
var DomParser = require('dom-parser');


var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
const using = require('gulp-using');

var options = {
    batch : ['./src/components', './content/html/']
    }


var optionsWord = {
    styleMap: [
        "p[style-name='tabelKop'] => span.tabelKop",
        "p[style-name='tabelNummers'] => span.tabelNummers",
        "p[style-name='TabelKopLinks'] => span.tabelKopLinks",
        "p[style-name='TabelKopRechts'] => span.tabelKopRechts",
        "p[style-name='TabelNummersCentreren'] => span.tabelNummersCentreren"
    ]
};


var dst =       '_dist/';
var prebuild =  'prebuild';
var fScss=      'src/scss/**/*.scss';
var fHtml=      'src/**/*.html';
var fHtmlNot=   '!src/components/nav.html';
var fImages=    ['src/images/**/*', '!src/images/oud/**/*'];
var fJs=        'src/js/**/*';
var fJson=      ['src/**/*.json', 'content/**/*.json'];
var fMd=        'content/**/*.md';
var allImgStr = 'not working';


var chapterId;



var siteJson = require('./content/data/sites.json');
var copyPath = require('./content/data/copyPath.json');
var stopwords = require('./content/data/stopwoorden.json');


// Create HTML
function createHtml(fileName) {
  mammoth.convertToHtml({path: copyPath.copyDestination+fileName+".docx", outputDir: "content/html/"}, optionsWord)
      .then(function(result){
          htmlOut = result.value; // The generated HTML
          messages = result.messages; // Any messages, such as warnings during conversion
          //console.log(htmlOut);
          fs.writeFileSync('content/html/'+fileName+'.html', htmlOut)
      })



}

function createRawtext(fileName) {
  mammoth.extractRawText({path: copyPath.copyDestination+fileName+".docx", outputDir: "content/rawTxt/"})
      .then(function(result){
        htmlOut = result.value; // The generated HTML
        messages = result.messages; // Any messages, such as warnings during conversion
        //console.log(htmlOut);
        fs.writeFileSync('content/html/raw_'+fileName+'.html', htmlOut)
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
      createRawtext(fileName);
      }
done();
});






gulp.task('browserSync', function() {
  browserSync.init({
    //proxy: "http://localhost:8888/wp-huc"
    server: {
      baseDir: dst
    },
    browser: ["firefox"], //, "firefox"
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

// gulp.task('getJSite', function (cb) {
//   exec('gsjson 1YAFTCWGrWyPjclnV16mR-S0-H2531DpOTfjCdESFSRk >> content/data/sites.json -b', function (err, stdout, stderr) { cb(err); });
// })
//
// gulp.task('getJLinks', function (cb) {
//   exec('gsjson 1tzMeyKmoFMGbehWd1Q0hWbTceVf6IajMGX4r3NUqLA8 >> content/data/links.json -b', function (err, stdout, stderr) { cb(err); });
// })
//
// gulp.task('getJNotes', function (cb) {
//   exec('gsjson 1Rh6CIMnB9Vs4ot21nZqFSQDMraWf4RLaoXpAM4JvFI4 >> content/data/notes.json -b', function (err, stdout, stderr) { cb(err); });
// })
//
// gulp.task('getJImages', function (cb) {
// exec('gsjson 15B_aMTtiGuokP1KP6Iu09RNr4X3ZZQyO-Qp1dq8eg7I >> content/data/images.json -b', function (err, stdout, stderr) { cb(err); });
// })
//
// gulp.task('getj', gulp.series('cleanJson', 'getJSite', 'getJLinks', 'getJNotes', 'getJImages',  function (done) {
//   done();
// }))

// gulp getj
// links  1tzMeyKmoFMGbehWd1Q0hWbTceVf6IajMGX4r3NUqLA8
// notes  1U2daUDRZfhFHcrVujJxNcqFejs2Ui58zBSi8ThlMw50
// notes  1Rh6CIMnB9Vs4ot21nZqFSQDMraWf4RLaoXpAM4JvFI4  // only longnotes
// site   1YAFTCWGrWyPjclnV16mR-S0-H2531DpOTfjCdESFSRk
// images 15B_aMTtiGuokP1KP6Iu09RNr4X3ZZQyO-Qp1dq8eg7I

// npm mammoth d1h1.docx output.html


gulp.task('clean', function () {
    return gulp.src(dst, {read: false, allowEmpty: true})
        .pipe(plumber())
        .pipe(clean())
});


// create navigation
gulp.task('nav', function(done) {
  var navItems = {"items" : siteJson}

  gulp.src(['./src/templates/nav.html', './src/templates/homeContentList.html'])
      .pipe(plumber())
      .pipe(handlebars(navItems, options))
      .pipe(gulp.dest('src/components/'));
  done();
});


// create index json root file
gulp.task('BuildIndexFromHTML', function(done) {
  var indexItems = {"items" : siteJson}

  //console.log(indexItems );

  gulp.src('./src/templates/createIndexJson.html')
      .pipe(plumber())
      .pipe(handlebars(indexItems, options))
      //.pipe(rename('test.html'))
      .pipe(rename(function (path) {
        path.basename = "example_data2";
        path.extname = ".json";
        }))
        //.pipe(replace('"', '\\"'))
        .pipe(replace('"', ''))
        .pipe(replace(/(?:\r\n|\r|\n)/g, ''))
        .pipe(replace('^^^', '"'))
      .pipe(gulp.dest('./'));
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
          .pipe(replace('±', '<br>'))
          .pipe(replace('">[', '">'))
          .pipe(replace('<a id="_Hlk61816812"></a>', ''))
          .pipe(replace('<h3><a id="_Hlk496267545"></a></h3>', ''))
          .pipe(replace(']</a>', '</a>'))
          .pipe(replace('<strong><sup><br /></sup></strong>', ''))
          .pipe(replace('m<sup>2</sup>', 'm&#178;'))
          .pipe(replace('<h2>Bijlage 1: Verbetering vaarwegen (1945-2020).<sup><sup>', '<h2>Bijlage 1: Verbetering vaarwegen (1945-2020).</h2><sup><sup>'))
          .pipe(replace('[146]</a></sup></sup></h2>', '[146]</a></sup></sup>'))

          .pipe(replace('<h2>Bijlage 2: Overzicht van de voornaamste vaarwegen die voor de binnenvaart werden gesloten.<sup><sup>', '<br><br><h2>Bijlage 2: Overzicht van de voornaamste vaarwegen die voor de binnenvaart werden gesloten.</h2><sup><sup>'))
          .pipe(replace('[147]</a></sup></sup></h2>', '[147]</a></sup></sup>'))
          .pipe(replace('gesloten.<sup><sup><a href="#endnote-148" id="endnote-ref-148">[148]</a></sup></sup></h2>', 'gesloten.</h2><sup><sup><a href="#endnote-148" id="endnote-ref-148">[148]</a></sup></sup>'))


          .pipe(replace('<sup>1</sup>/<sub>3</sub>', '&frac13;'))
          .pipe(replace('<sup>1</sup>/<sub>8</sub>', '&frac18;'))
          .pipe(replace('<strong>]]]</strong>', ']]]'))

          .pipe(replace('<sup>a</sup>', '<sup class="refNote">a</ sup>'))
          .pipe(replace('<sup>b</sup>', '<sup class="refNote">b</ sup>'))
          .pipe(replace('<sup>c</sup>', '<sup class="refNote">c</ sup>'))
          .pipe(replace('<sup>c </sup>', '<sup class="refNote">c</ sup>'))
          .pipe(replace('<sup>d</sup>', '<sup class="refNote">d</ sup> '))
          .pipe(replace('<sup>d </sup>', '<sup class="refNote">d</ sup> '))
          .pipe(replace('<sup>e</sup>', '&#7497'))
          .pipe(replace('<sup>e </sup>', '&#7497'))
          .pipe(replace('<sup>e  </sup>', '&#7497 '))

          

          .pipe(replace('<sup>6</sup>', '<sup class="refNote">6</ sup> '))
          .pipe(replace('<sup>II</sup>', '<sup class="refNote">II</ sup> '))


          .pipe(replace('<sup>*</sup>', '<span class="astrixNote">*</span>'))
          .pipe(replace('<sup>* </sup>', '<span class="astrixNote">*</span>'))
          .pipe(replace('m<sup>3</sup>', 'm&#179;'))
          .pipe(replace('m<sup>2 </sup>', 'm&#178;'))
          .pipe(replace('m<sup>2  </sup>', 'm&#178;'))
          .pipe(replace('<sup> <sup>', '<sup>'))
          .pipe(replace('<sup><sup>', '<sup>'))
          .pipe(replace('</sup></sup>', '</sup>'))
          .pipe(replace('<sup> </sup>', ' '))
          .pipe(replace('<sup>', '&nbsp;<span class="noot">'))
          .pipe(replace('</sup>', '</span>'))
          .pipe(replace('</ sup>', '</sup>'))
          .pipe(replace('@i@', '<div class="inlineImgRow">'))
          .pipe(replace('@/i@', '</div>'))
          .pipe(replace('@q@', '<div class="quote">'))
          .pipe(replace('@/q@', '</div>'))
          .pipe(replace('@H@&lt;', ''))
          .pipe(replace('&gt;@/h@', ''))
          .pipe(replace('@/h@', ''))
          .pipe(replace('33_NRCDienstregeling', '33_NRCDienstverlening'))
          .pipe(replace('<ol><li id="endnote-1">', '<div class="notesList"><h2>Noten</h2><ol><li id="endnote-1">'))
          .pipe(replace('<td colspan="2"><p><strong>Sleepboten</strong></p></td>', '<td colspan="2" style="text-align: center;"><p><strong>Sleepboten</strong></p></td>'))
          .pipe(replace('<td><p>NoordHollands Kanaal</p></td>', '<td><p>Noord-Hollands Kanaal</p></td>'))
          .pipe(replace('<strong>Aandeel spoorwegvervoer(%)</strong>', '<strong>Aandeel spoorwegvervoer<br>(%)</strong>'))
          .pipe(replace('<strong>3b_Kaart_maritiem_01.jpg</strong>]]]', '3b_Kaart_maritiem_01.jpg]]]'))
          .pipe(replace('[[[20_tjalk1]]]', '[[[20_tjalk1.jpg]]]'))
          .pipe(replace('[[[26_werfGips]]]', '[[[26_werfGips.jpg]]]'))
          .pipe(replace('[[[33_Zeemanshuis. jpg]]]', '[[[33_Zeemanshuis.jpg]]]'))
          //.pipe(replace('[[[18_Zwanette​', '@i@[[[18_Zwanette'))
          .pipe(replace('<a id="_Hlk88569018"></a>', ''))
          .pipe(replace('<a id="_Hlk88569036"></a>', ''))
          .pipe(replace('[[[<a id="_Hlk83826445"></a>45_modelboei.jpg]]]', '[[[45_modelboei.jpg]]]'))
          .pipe(replace('[[[<a id="_Hlk83826610"></a>49_houtenmodel.jpg]]]', '[[[49_houtenmodel.jpg]]]'))
          .pipe(replace('[[[<a id="_Hlk83826638"></a>50_Zeemanshoop.jpg]]]', '[[[50_Zeemanshoop.jpg]]]'))
          .pipe(replace('[[[<a id="_Hlk83826714"></a>53_reddingboot.jpg]]]', '[[[53_reddingboot.jpg]]]'))
          .pipe(replace('[[[<a id="_Hlk83826545"></a>46_uitsnRaderstoomschip.jpg]]]', '[[[46_uitsnRaderstoomschip.jpg]]]'))
          .pipe(replace('[[[<a id="_Hlk83826574"></a>47_Argandslampen.jpg]]]', '[[[47_Argandslampen.jpg]]]'))
          .pipe(replace('23_fig.1.23a.jpg', '23a_fig.1.23a.jpg'))
          .pipe(replace('30a_fig. 4.10.JPG', '30a_fig.4.10.jpg'))
          .pipe(replace('35a_fig.2.7a.JPG', '35a_fig.2.7a.jpg'))
          .pipe(replace('35b_fig.2.7b.JPG', '35b_fig.2.7b.jpg'))
          .pipe(replace('56_fig.3.3.JPG', '56_fig.3.3.jpg'))
          .pipe(replace('35b_fig.2.7b.JPG', '35b_fig.2.7b.jpg'))


//           /^in[a-z]*ing$/i
// .pipe(replace('<a id="_Hlk73021537"></a>', ''))
          .pipe(replace(/^<a id=\"_[a-z]*"><\/a\>$/i, ''))
          .pipe(replace('<a id="_Hlk73021537"></a>', ''))
          .pipe(replace('<a id="_Hlk93063491"></a>', ''))
          .pipe(replace('<a id="_Hlk73021574"></a>', ''))
          .pipe(replace('<a id="_Hlk95767916"></a>', ''))
          .pipe(replace('<a id="_Hlk73021668"></a>', ''))
          .pipe(replace('<a id="_Hlk93067532"></a>', ''))

          .pipe(replace('<a id="_Hlk93068511"></a>', ''))
          .pipe(replace('<a id="_Hlk95076596"></a>', ''))
          .pipe(replace('<a id="_Hlk94626720"></a>', ''))
          .pipe(replace('<a id="_Hlk94626755"></a>', ''))
          .pipe(replace('<a id="_Hlk94626788"></a>', ''))
          .pipe(replace('<a id="_Hlk94626811"></a>', ''))
          .pipe(replace('<a id="_Hlk94626865"></a>', ''))
          .pipe(replace('<a id="_Hlk94626901"></a>', ''))

          .pipe(replace('<a id="_Hlk93085197"></a>', ''))
          .pipe(replace('<a id="_Hlk94626934"></a>', ''))
          .pipe(replace('<a id="_Hlk94626957"></a>', ''))
          .pipe(replace('<a id="_Hlk94626986"></a>', ''))
          .pipe(replace('<a id="_Hlk94627004"></a>', ''))
          .pipe(replace('<a id="_Hlk94627043"></a>', ''))
          .pipe(replace('<a id="_Hlk107089961"></a>', ''))
          .pipe(replace('<a id="_Hlk107090037"></a>', ''))


          .pipe(replace('<a id="_Hlk8380140"></a>', ''))
          .pipe(replace('<a id="_Hlk107090143"></a>', ''))
          .pipe(replace('<a id="_Hlk8380361"></a>', ''))
          .pipe(replace('<a id="_Hlk107090616"></a>', ''))
          .pipe(replace('<a id="_Hlk107090639"></a>', ''))
          .pipe(replace('<a id="_Hlk107090783"></a>', ''))
          .pipe(replace('<a id="_Hlk107090817"></a>', ''))
          .pipe(replace('<a id="_Hlk107090953"></a>', ''))


          .pipe(replace("[[38_Coenen's_Visboeck.jpg]]", '[[38_Coenens_Visboeck.jpg]]'))
          .pipe(replace('https//www', 'https://www'))



          .pipe(replace('<table>', '<div class="tableWrap"><table>'))
          .pipe(replace('</table>', '</table></div>'))



           .pipe(replace('<strong>stoomvaart</strong>', 'stoomvaart'))
           .pipe(replace('<strong>Rotterdam</strong>', 'Rotterdam'))
           .pipe(replace('<strong>De bebakening van de Zuiderzeekust', 'De bebakening van de Zuiderzeekust'))
           .pipe(replace('firma’s kregen nu</strong>', 'firma’s kregen nu'))

          .pipe(replace('Ondine', '<em>Ondine</em>'))
          .pipe(replace('Koning Willem II', '<em>Koning Willem II</em>'))
          .pipe(replace('IJssel de Nederlander bouwen', 'IJssel de <em>Nederlander</em> bouwen'))
          .pipe(replace('Gouverneur van Ewijck', '<em>Gouverneur van Ewijck</em>'))
          .pipe(replace('Burgemeester Huydecoper', '<em>Burgemeester Huydecoper</em>'))
          .pipe(replace('Wiskundige scheepsbouw en bestuur', '<em>Wiskundige scheepsbouw en bestuur</em>'))
          .pipe(replace('Aanleiding tot de kennis van het beschouwende gedeelte der scheepsbouwkunde', '<em>Aanleiding tot de kennis van het beschouwende gedeelte der scheepsbouwkunde</em>'))
          .pipe(replace('Chefs Militaires', '<em>Chefs Militaires</em>'))
          .pipe(replace('De Hunze', '<em>De Hunze</em>'))
          .pipe(replace('de Zuid ', '<em>de Zuid</em> '))
          .pipe(replace('de Noord ', '<em>de Noord</em> '))

          .pipe(replace('<strong>~~<br>~~</strong>', ''))
          .pipe(replace(']]]@/i@</p>\n<p>@i@[[[', ']]]  [[['))

          .pipe(replace('<sup>1</sup>/<sub>3</sub>', '&frac13;'))
          .pipe(replace('<sup>1</sup>/<sub>8</sub>', '&frac18;'))
          .pipe(replace('<sup>3</sup>/<sub>8</sub>', '&frac38;'))

          .pipe(replace('<h2>Voor Nederlandse krijgsgevangenen', '<p>Voor Nederlandse krijgsgevangenen'))
          .pipe(replace('@i@[[[139-3.44_SchipbreukFokke.jpg]]]@/i@<strong><br /></strong></h2>', '@i@[[[139-3.44_SchipbreukFokke.jpg]]]@/i@<strong><br /></strong></p>'))


          .pipe(replace('<h4>', '<h4 style="font-style: italic;">'))
          .pipe(replace('2<sup class="refNote">a</sup> 2222', '2<sup>a</sup>'))
          .pipe(replace('<strong><br /></strong>', ''))
          .pipe(replace('[[[14a-10_bevrachtingsboekje1025.jp]]]', '[[[14a-10_bevrachtingsboekje1025.jpg]]]'))
          .pipe(replace('[[[46-35_hoopopwelvaart.jpeg]]]', '[[[46-35_hoopopwelvaart.jpg]]]'))

          .pipe(replace('[[[30-25a_Maasbracht3118.JPG]]]', '[[[30-25a_Maasbracht3118.jpg]]]'))
          .pipe(replace('[[[31-25b_Maasbracht3074.JPG]]]', '[[[31-25b_Maasbracht3074.jpg]]]'))
          .pipe(replace('[[[41-60_BeweegbaarStuurhuis.JPG]]]', '[[[41-60_BeweegbaarStuurhuis.jpg]]]'))
          .pipe(replace('[[[47b-40b_parlevinkerAlphen.png]]]', '[[[47b-40b_parlevinkerAlphen.jpg]]]'))
          .pipe(replace('[[[68-27_Jagrie.JPG]]]', '[[[68-27_Jagrie.jpg]]]'))
          .pipe(replace('[[[74-63_autoschip.JPG]]]', '[[[74-63_autoschip.jpg]]]'))
          .pipe(replace('[[[75-02_IJsbreker.png]]]', '[[[75-02_IJsbreker.jpg]]]'))
          .pipe(replace('[[[26-19_BruineVloot.png]]]', '[[[26-19_BruineVloot.jpg]]]'))
          .pipe(replace('[[[22-40b2_Cornelia.jpg]]]', '[[[22-40b_Cornelia.jpg]]]'))

          //.pipe(replace('[[[57a_FriesemaatkastCatherina.jpg]]]', '[[[57a_FriesemaaatkastCatherina.jpg]]]'))

          .pipe(replace('[[[45a_Westlanderonderbrug.png]]]', '[[[45a_Westlanderonderbrug.jpg]]]'))
          .pipe(replace('[[[57-45_0A_kaart1.def.jpg]]]', '[[[57-45-0A-kaart1.def.jpg]]]'))
          .pipe(replace('[[[57a_FriesemaatkastCatherina.png]]]', '[[[57a_FriesemaatkastCatherina.jpg]]]'))
          .pipe(replace('<p>1960</p><p>1964</p><p>1964</p>', '<p>1960</p><p><br></p><p>1964</p><p>1964</p>'))

          .pipe(replace('<p>1970</p><p>1970<br />1976</p><p>1979</p><p>1980</p><p>   -</p><p>1982</p><p>1983</p><p>1988</p><p>1990, 1996</p><p>1990/1999</p><p>ca. 1991</p>', '<p>1970</p><br><p>1970<br />1976</p><br><p>1979</p><p>1980</p><p>   -</p><br><p>1982</p><p>1983</p><p>1988</p><p>1990, 1996</p><p>1990/1999</p><br><p>ca. 1991</p>'))
          .pipe(replace('<strong>Vaarroute</strong></p></td><td><p><strong>Project</strong></p></td><td><p><strong>Jaar</strong>', '<strong>Vaarroute</strong></p></td><td><p><strong>Project</strong></p></td><td style="width:100px;"><p><strong>Jaar</strong>'))
          .pipe(replace('<p>Gereed 1967</p><p>1960-1968</p><p>Gereed 1975</p><p>Gereed 1977</p>', '<p>Gereed 1967</p><br><p>1960-1968</p><p>Gereed 1975</p><br><p>Gereed 1977</p>'))
          .pipe(replace('<td><p>1956-1970</p><p>1959-1961</p><p>1964-1970</p><p>1970-1977</p>', '<td><br><p>1956-1970</p><p>1959-1961</p><br><br><p>1964-1970</p><p>1970-1977</p>'))
          .pipe(replace('<td><p>ca.1957-</p><p>1976</p><p>Jaren 1970</p><p>1983</p><p>ca. 1978-1990</p><p>ca. 1981-1993</p><p>1982-1993</p><p>Gereed 1990</p><p>1986-1992</p><p>ca. 2000</p><p>2003-2010</p><p>2015</p>', '<td><p>ca.1957-</p><p>1976</p><br><p>Jaren 1970</p><p>1983</p><br><p>ca. 1978-1990</p><br><p>ca. 1981-1993</p><br><p>1982-1993</p><p>Gereed 1990</p><br><p>1986-1992</p><p>ca. 2000</p><br><p>2003-2010</p><br><p>2015</p>'))
          .pipe(replace('Wilhelminakanaal bij Tilburg (klasse IV). </p><p>Vergroting Julianankanaal</p>', 'Wilhelminakanaal bij Tilburg (klasse IV). </p><p>Vergroting Julianankanaal</p><br><br>'))
          .pipe(replace('<p>1956</p><p>1954-1957</p><p>ca. 1960</p><p>ca. 1960</p><p>1962</p><p>1954-1964</p><p>ca. 1960</p>', 
                        '<p>1956</p><br><p>1954-1957</p><p>ca. 1960</p><p>ca. 1960</p><p>1962</p><p>1954-1964</p><p>ca. 1960</p>'))

          .pipe(replace('<p>-</p><p>ca. 1984</p><p>1964-1988</p>', '<p>-</p><p>ca. 1984</p><br><p>1964-1988</p>'))
          .pipe(replace('</td><td><p>1954</p><p>1956</p>', '</td><td style="vertical-align: top"><p>1954</p><p>1956</p>'))
          .pipe(replace('<p>1951-ca. 1970</p>', '<br><p>1951-ca. 1970</p>'))
          .pipe(replace('<p>ca. 2003</p><p>In uitvoering</p><p>In uitvoering</p><p>2013</p><p>2014</p><p>Vanaf  2015</p><p>ca. 2020</p>', '<p>ca. 2003</p><br><p>In uitvoering</p><br><p>In uitvoering</p><p>2013</p><br><p>2014</p><p>Vanaf  2015</p><p>ca. 2020</p>'))
          .pipe(replace('<td><p>Voltooid</p><p>In uitvoering.</p></td>', '<td><br><p>Voltooid</p><br><p>In uitvoering.</p></td>'))
          .pipe(replace('14b-3b_IJsselkoggeA4.jpg', '14b-3b_IJsselkogge.jpg'))
          .pipe(replace('14a-3a_IJsselkogge.JPG', '14a-3a_IJsselkogge.jpg'))

          .pipe(replace('18a-4-17_scheepjeseenvoudigezeilvoering]]]', '18a-4-17_Scheepjeseenvoudigezeilvoering.jpg]]]'))

          .pipe(replace('8_Mataró-model.jpg', '8_Mataro-model.jpg'))
          .pipe(replace('29_Panorama_Köln.jpg', '29_Panorama_Koln.jpg'))
          .pipe(replace('25_Adolf_van_Bourgondië.jpg', '25_Adolf_van_Bourgondie.jpg'))
          .pipe(replace('34_Raniero_I_de_Mónaco.jpg', '34_Raniero_I_de_Monaco.jpg'))
          .pipe(replace('80-2.52a_DekzichtOostIndië.jpg', '80-2.52a_DekzichtOostIndie.jpg'))
          .pipe(replace('39-52_Wasserbüffel_Eerste.jpg', '39-52_Wasserbuffel_Eerste.jpg'))









          .pipe(each(function(content, file, callback) {
            var newContent = content;

            // Get the ID
            var d = new DomParser().parseFromString( newContent, "text/xml" );
            var id = d.getElementById("chaperId").innerHTML;  //chaperId
            var template = d.getElementById("chaperTemp").innerHTML;

            // replace the images
            newContent = handleImages(content, id);

            callback(null, newContent);
          }))
          .pipe(replace(',******', ''))
          .pipe(dom(function(){

            //remove <br> in title
            var title = this.getElementsByTagName("title")[0].innerHTML;
            this.getElementsByTagName("title")[0].innerHTML = title.replace('&lt;br&gt;',' ');

            // remove links in h2
            var h2 = this.getElementsByTagName("h2");
            for (var i = 0; i < h2.length; i++) {
              var firstA = h2[i].getElementsByTagName("a")[1];
              if(typeof firstA !== "undefined") {
                firstA.remove();
              }

              var firstA2 = h2[i].getElementsByTagName("a")[0];
              if(typeof firstA2 !== "undefined") {
                firstA2.remove();
              }

            }

            // remove links in h2
            var endnotesA = this.getElementsByTagName("a");

            for (var i = 0; i < endnotesA.length; i++) {
              let href  = endnotesA[i].getAttribute('href');
              if ( !!href) {
                if (href.includes("#endnote-")) {
                  if (!href.includes("-ref")) {
                    //console.log(href);
                    endnotesA[i].setAttribute('id', 'endnote-ref-'+href.replace("#endnote-", ''));
                  }
                }
              }

              

            }


            var chapterId = this.getElementById("chaperId").innerHTML;
            var chaperTemp = this.getElementById("chaperTemp").innerHTML;

            //handle the notes
            if ((chaperTemp == 'basic') || (chaperTemp == 'chapter')) {
              domContent = handleNotes(this, chapterId);
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

gulp.task('copyJs', function(){
  return gulp.src('src/js/elasticlunr.min.js')
      .pipe(plumber())
      .pipe(gulp.dest(dst+'js'))
});

gulp.task('copyJson', function(){
  return gulp.src('src/js/search_index.js')
      .pipe(plumber())
      .pipe(gulp.dest(dst+'js'))
});

gulp.task('copyRestoreFiles', function(){
  return gulp.src('src/restore/*.html')
      .pipe(plumber())
      .pipe(gulp.dest(dst))

});

gulp.task('copyRestoreImages1', function(){

  return gulp.src('src/restore/170/6_compleetpanoramaWalcheren.jpg')
      .pipe(plumber())
      .pipe(gulp.dest('./src/images/d1h4/d1h4-170'))

});



gulp.task('copyRestoreImages2', function(){

  return gulp.src('src/restore/600/6_compleetpanoramaWalcheren.jpg')
    .pipe(plumber())
    .pipe(gulp.dest('./src/images/d1h4/d1h4-600'))
});


gulp.task('copyRestoreImages3', function(){

  return gulp.src('src/restore/big/6_compleetpanoramaWalcheren.jpg')
      .pipe(plumber())
      .pipe(gulp.dest('./src/images/d1h4/d1h4-big'))
});


gulp.task('copyRestoreImages4', function(){
  return gulp.src('src/restore/170/78_fig.4.12.jpg')
      .pipe(plumber())
      .pipe(gulp.dest('./src/images/d2h6/d2h6-170'))
});

gulp.task('copyRestoreImages5', function(){
  return gulp.src('src/restore/600/78_fig.4.12.jpg')
      .pipe(plumber())
      .pipe(gulp.dest('./src/images/d2h6/d2h6-600'))
});

gulp.task('copyRestoreImages6', function(){
  return gulp.src('src/restore/big/78_fig.4.12.jpg')
      .pipe(plumber())
      .pipe(gulp.dest('./src/images/d2h6/d2h6-big'))
});

gulp.task('copyRestoreImages7', function(){
  return gulp.src('src/restore/170/10-9_Haringbuizen.jpg')
      .pipe(plumber())
      .pipe(gulp.dest('./src/images/d1h3/d1h3-170'))
});

gulp.task('copyRestoreImages8', function(){
  return gulp.src('src/restore/170/9-18_WalcherseRede.jpg')
      .pipe(plumber())
      .pipe(gulp.dest('./src/images/d1h3/d1h3-170'))
});

gulp.task('placeCss', function(){
  return gulp.src(['src/css/print.css', 'src/css/style.css'])
      .pipe(plumber())
      .pipe(gulp.dest(dst+'css'))
});

gulp.task('staticPages', function(){
  return gulp.src(['static/*'])
      .pipe(plumber())
      .pipe(gulp.dest(dst))
});






gulp.task('buildSearchIndex', function (done) {
  var elasticlunr = require('./src/js/elasticlunr.min.js'),
      fs = require('fs');
  // require('./src/js/lunr.stemmer.support.js')(elasticlunr);
  // require('./src/js/lunr.du.js')(elasticlunr);

  var idx = elasticlunr(function () {
    //this.use(elasticlunr.du);

    this.setRef('id');
    this.addField('title');
    this.addField('tags');
    this.addField('body');
  });

  elasticlunr.clearStopWords();
  var customized_stop_words = stopwords;
  elasticlunr.addStopWords(customized_stop_words);


  fs.readFile('./example_data2.json', function (err, data) {
    if (err) throw err;

    var raw = JSON.parse(data);
    //console.log(raw);

    var siteContent = raw.siteContent.map(function (q) {
      return {
        id: q.id,
        title: q.title,
        body: q.body,
        part: q.part,
        chapter: q.chapter,
        ref: q.ref
      };
    });

    siteContent.forEach(function (siteContent) {
      idx.addDoc(siteContent);
    });

    fs.writeFile('./src/js/search_index.js', "var indexDump = "+JSON.stringify(idx), function (err) {
      if (err) throw err;
      console.log('done');
    });
  });


done();
});





gulp.task('build',
  gulp.series('clean', 'copyRestoreImages1', 'copyRestoreImages2', 'copyRestoreImages3', 'copyRestoreImages4', 'copyRestoreImages5', 'copyRestoreImages6', 'copyRestoreImages7', 'copyRestoreImages8', 'nav', 'buildFromTemplates', 'copyImg', 'copyJs', 'copyJson', 'copyRestoreFiles', 'placeCss', //'buildSearchIndex',
  function(done) {
      done();
  }
));


gulp.task('watch', function () {
  gulp.watch(['src/**/*.html', '!src/components/nav.html', '!src/components/homeContentList.html', 'src/scss/**/*.scss','src/js/**/*', 'src/**/*.json', 'content/**/*.json'], gulp.series('build')); //, fHtmlNot, fScss, fJs, fJson, fMd
});



gulp.task('default',
  gulp.series('build', gulp.parallel('browserSync','watch'),
  function(done) {
      done();
  }

));


function ifEmp(input, pre, post) {
  let out = ''
  if( (input != undefined) ) {
    if (input != '') {
      out = pre+input+post;
    }
  }
  return out;

}

function handleEmptyWordLinks(newContent, id) {

}




// image function.
function handleImages(newContent, id) {
  var output;
  for (var k = 0; k < imagesJson.length; k++) {


          // before [[[
          newContent = newContent.replace('[[['+imagesJson[k].filename, '<div class="inlineImage" id="'
          +imagesJson[k].filename+'"><span><img src="images/'+imagesJson[k].chapter+'/'+imagesJson[k].chapter+'-170/'+imagesJson[k].filename);

          //after ]]]
          newContent = newContent.replace(imagesJson[k].filename+']]]', imagesJson[k].filename+'" alt="'+
          ifEmp(imagesJson[k].title, '', '')+ifEmp(imagesJson[k].description, '. ', '')
          +'"></span>'
          +'<div class="caption">'
          +'<div class="captionTitle">'+ifEmp(imagesJson[k].title, '', '')+'</div>'
          +'<span class="openCaption">[i]</span>'
          +'<div class="moreCaption">'
          +ifEmp(imagesJson[k].description, '', '')
          +ifEmp(imagesJson[k].description2, '<br><span>', '</span>')
          +ifEmp(imagesJson[k].description3, '<br><span>', '</span>')
          +ifEmp(imagesJson[k].location, '<br>', '')
          +ifEmp(imagesJson[k].owner, '<br><em>', '</em>')
          +'</div></div></div>');

          // images array
          if (imagesJson[k].filename!= undefined) {
            //console.log(id +' = '+imagesJson[k].chapter);
            if (id == imagesJson[k].chapter) {
              newContent = newContent.replace('******', "'"+imagesJson[k].filename+"',******")
            }
          }
  }
  return newContent;
}


function handleNotes(domContent, chapterId) {

      for(var l=0; l<notesJson.length; l++) {
        
        if (chapterId == notesJson[l].chapter) {
          //console.log(chapterId +' >> '+ notesJson[l].chapter);
          var noteContent;

          // notes to long notes
          noteContent =  ifEmp(notesJson[l].long_note, '', '');
          noteContent  += ifEmp(notesJson[l].auteur1, '', ', ');
          noteContent  += ifEmp(notesJson[l].publicatie1, '<em>', '</em> ');
          noteContent  += ifEmp(notesJson[l].publicatie1extra, '<br>', '');
          noteContent  += ifEmp(notesJson[l].auteur2, '<br>', ', ');
          noteContent  += ifEmp(notesJson[l].publicatie2, '<em>', '</em> ');
          noteContent  += ifEmp(notesJson[l].publicatie2extra, '<br>', '');
          noteContent  += ifEmp(notesJson[l].extra, '<br>', '');
          noteContent  += ifEmp(notesJson[l].url, '<br><div class="ellipsis"><a target="_blank" href="'+notesJson[l].url+'">', '</a></div>');
          noteContent  += ifEmp(notesJson[l].viewdatumurl, '', '');
          noteContent  += ifEmp(notesJson[l].worldcat, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel2, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel3, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel4, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel5, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel6, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel7, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel8, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel9, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel10, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel11, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel12, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel13, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel14, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel15, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel16, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel17, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel18, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          noteContent  += ifEmp(notesJson[l].worldcattitel19, '<br><a href="', '" target="_blank">Zie worldcat.org</a>');
          //console.log(chapterId, 'endnote-'+notesJson[l].note_number);


          var element = domContent.getElementById('endnote-'+notesJson[l].note_number)
          if (typeof(element) != 'undefined' && element != null) {
              domContent.getElementById('endnote-'+notesJson[l].note_number).innerHTML = noteContent;
            }


        }
      }
  return domContent;
}
