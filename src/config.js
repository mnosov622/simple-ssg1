const fs = require("fs");
const path = require('path');

const config = {
  dev: {
    postsdir: "./content",
    inputPath:"./content",
    outdir: "./dist",
    lang: "en",
    stylesheet: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
  }
};


//chelc if it's just null or whitespace 
function isNullOrWhitespace( input ) {
  return !input || !input.trim();
}

//if config JSON file exist, save the content to config module
const setConfig = (argvConfig) => {
  if (!fs.existsSync(argvConfig) || path.extname(argvConfig)!=".JSON") {
    console.log("It's not an existing JSON file.");
    return 0;
  }
  
  //read the parse the config file
  const configString = fs.readFileSync(argvConfig).toString();
  try { 
    var temptConfig = JSON.parse(configString);
  }catch(err) {
    console.log("Please make sure the JSON file is valid. Encountered an issue: "+err);
    return 0;
  }
  
  //checking if each option exist from the config file before assiging to confgi module
  if(!isNullOrWhitespace(temptConfig.postsdir)) config.dev.postsdir = temptConfig.postsdir;
  if(!isNullOrWhitespace(temptConfig.inputPath)) config.dev.inputPath = temptConfig.inputPath;
  if(!isNullOrWhitespace(temptConfig.outdir)) config.dev.outdir = temptConfig.outdir;
  if(!isNullOrWhitespace(temptConfig.lang)) config.dev.lang= temptConfig.lang;
  if(!isNullOrWhitespace(temptConfig.stylesheet)) config.dev.stylesheet= temptConfig.stylesheet;
  
  return true;
}

  
  


module.exports = {
  config: config,
  setConfig: setConfig
};
