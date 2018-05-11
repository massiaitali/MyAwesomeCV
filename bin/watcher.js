// Environment Variables
const ROOT_PATH = 'www/',
      VIEW_PATH = 'src/view/',
      STYLE_SOURCE_PATH = 'src/scss/',
      STYLE_OUTPUT_PATH = 'www/css/',
      SCRIPT_SOURCE_PATH = 'src/js/',
      SCRIPT_OUTPUT_PATH = 'www/js/';



// Local Dependencies
const Builder = require('../libs/builder');


// External Dependencies
const bs = require('browser-sync').create(),
      watch = require('node-watch');



// Initialize Browser Sync
bs.init({
  server: ROOT_PATH
})

// Watching for change
bs.watch(ROOT_PATH + '**/*.*').on('change', function () {
  bs.reload()
})


// Re-build Stylesheet files
watch(STYLE_SOURCE_PATH, { recursive: true }, (event, pathfile) => {
  if ('update' === event) {
    Builder.buildStyles(STYLE_SOURCE_PATH, STYLE_OUTPUT_PATH);
  }
})

// Re-build Script files
watch(SCRIPT_SOURCE_PATH, { recursive: true }, (event, pathfile) => {
  if ('update' === event) {
    Builder.buildScripts(SCRIPT_SOURCE_PATH, SCRIPT_OUTPUT_PATH);
  }
})