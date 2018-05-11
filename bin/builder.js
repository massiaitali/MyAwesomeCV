// Environment Variables
const VIEW_PATH = 'src/view/',
      STYLE_SOURCE_PATH = 'src/scss/',
      STYLE_OUTPUT_PATH = 'www/css/',
      SCRIPT_SOURCE_PATH = 'src/js/',
      SCRIPT_OUTPUT_PATH = 'www/js/';


// Local Dependencies
const Builder = require('../libs/builder');


// Compile Sass Files
Builder.buildStyles(STYLE_SOURCE_PATH, STYLE_OUTPUT_PATH);


// Compile JS Files
Builder.buildScripts(SCRIPT_SOURCE_PATH, SCRIPT_OUTPUT_PATH);