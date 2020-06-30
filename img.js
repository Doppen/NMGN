
const fs = require('fs');
const sharp = require('sharp');
// https://sharp.pixelplumbing.com/api-resize
var copyPath = require('./content/data/copyPath.json');

//NMGNdocx oldstr.replace("Microsoft", "W3Schools");
// images

var imgPath = copyPath.copyDestination.replace("NMGNdocx", "NMGNimages");
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
        //console.log(file);
         fs.stat(inputFolder+file, function(err, stats) {
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
  var folderExt = size;
  if (size == 2000) {
    folderExt = 'big';
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
          .resize({ width: size })
          .toFile(outFolderSize+file, function(err) {});
      }


    });
   });
}
