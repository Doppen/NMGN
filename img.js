
const fs = require('fs');
const sharp = require('sharp');
// https://sharp.pixelplumbing.com/api-resize
var copyPath = require('./content/data/copyPath.json');

//NMGNdocx oldstr.replace("Microsoft", "W3Schools");
// images



sharp('Slag.jpg')
  .resize( { width: 100 } )
  .toFile('Slag2.jpg', function(err) {});




//var imgPath = copyPath.copyDestination.replace("NMGNdocx", "NMGNimages");
var imgPath = '/Users/basdoppen/My Drive/NMGN-docs/NMGNimages/'
// images
const inputFolder  = imgPath;
const outputFolder = './src/images/';

  // read folder
  fs.readdir(inputFolder, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      }

      // go throught content
      files.forEach(function (file) {

         fs.stat(inputFolder+file, function(err, stats) {
           console.log(stats);
          if(typeof stats !== "undefined") {


            var ifIsDir = stats.isDirectory();

            //if file is folder
            if (ifIsDir) {
              var folderPath = inputFolder+file+'/';
              resizeFiles(folderPath, 170, file);
              resizeFiles(folderPath, 600, file);
              resizeFiles(folderPath, 2000, file);
            }
          }
         });
      });
  });


function resizeFiles(folderPath, size, foldername) {
  console.log('resizeFile');
  var folderExt = size;
  var action = { width: size };
  if (size == 2000) {
    folderExt = 'big';
  }
  if (size == 170) {
    action = { height: 170 };
  }

  var outFolderSize = outputFolder+foldername+'/'+foldername+'-'+folderExt+'/';
  //console.log(outFolderSize);


  // create folder
  fs.mkdir(outFolderSize, {recursive: true}, err => {
  //fs.mkdir(outFolderSize, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
  });


   fs.readdir(folderPath, function (err, files) {
    files.forEach(function (file) {
      if (file.slice(file.length - 4) != '.tif') {
        sharp(folderPath+file)
          .resize( action )
          .toFile(outFolderSize+file, function(err) {});
      }


    });
   });
}
