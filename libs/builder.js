// Local Dependencies
const Log = require('../libs/log');

// External Dependencies
const fs = require('fs'),
      browserify = require('browserify'),
      sass = require('node-sass'),
      vueify = require('vueify');



module.exports = {

  buildStyles: function(inPath, outPath) {
    // Compile Sass Files
    fs.readdir(inPath, (err, files) => {

      // For each stylesheet files of first level
      files.forEach((filePath) => {
        if ('.scss' === filePath.substr(-5)) {
          let outputPath = outPath + filePath.substr(0, filePath.length-5) + '.css';

          // Render the CSS
          sass.render({
            file: inPath + filePath,
            outFile: outputPath
          }, (err, result) => {
            if (!err) {
              // Write CSS File
              fs.writeFile(outputPath, result.css, (err) => {
                if (!err) {
                  Log.info('STYLE_COMPILER', `${filePath} builded`)
                }
              })
            } else {
              Log.err('STYLE_COMPILER', `Error into parsing of ${filePath}\n${err.formatted}`)
            }
          })
        }
      })
    })
  },

  buildScripts: function(inPath, outPath) {
    fs.readdir(inPath, (err, files) => {
      // For each javascript files of first level
      files.forEach((filePath) => {
        if ('.js' === filePath.substr(-3)) {
          browserify(inPath + filePath)
            .transform("babelify", {
              presets: [ "env" ]
            })
            .transform(vueify, {
              babel: {
                presets: [ "env" ]
              }
            })
            .bundle()
            .on('error', err => {
              Log.err('SCRIPT_COMPILER', `Error into parsing of ${filePath}\n${err}`)
            })
            .pipe(fs
              .createWriteStream(outPath + filePath)
              .on('error', err => {
                Log.err('SCRIPT_COMPILER', `Error into write of ${filePath}\n${err}`)
              })
              .on('finish', () => {
                  Log.info('SCRIPT_COMPILER', `${filePath} builded`)
              }));
        }
      })
    });
  }

}