#!/usr/bin/env node

const args = process.argv;
const fs = require("fs");
const path = require('path');

const postMethods = require("./posts");
const config = require("./config");
const addHomePage = require("./homepage");

const minArgv = require('minimist')(process.argv.slice(2));

//if config JSON file exist, save the content to config module
if(minArgv.config || minArgv.c){
  let argvConfig=minArgv.config || minArgv.c;
  if (!fs.existsSync(argvConfig) || path.extname(argvConfig)!=".JSON") {
    console.log("It's not an existing JSON file.");
    return 0;
  }
  
  const configString = fs.readFileSync(argvConfig).toString();
  try { 
    config.dev = JSON.parse(configString);
  }catch(err) {
    console.log("Please make sure the JSON file is valid. Encountered an issue: "+err);
    return 0;
  }
  
  var configFile=true;
  
}



const posts = fs
          .readdirSync(config.dev.postsdir)
          .map(post => post.slice(0, -4))
          .map(post => postMethods.createPost(post))


      
//if config file is used, and the file path is valid, parse the input files
if(configFile && fs.existsSync(config.dev.postsdir)) {

  //if it's a single .txt or .md file
  if (path.extname(config.dev.inputPath) == ".txt") {
    let p=path.join(config.dev.postsdir,config.dev.inputPath);
    if(!fs.existsSync(p)) { //check it the file exists
      console.log("The single file input doesn't exist.");
      return 0;
    }

    //create the single file output
    if(!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);
    let input=config.dev.inputPath.replace(".txt", "");
    let post=postMethods.createPost(input);
    postMethods.createSingle(post);
    return 0;

  //if it's a folder
  }else {

    //create the file outputs
    if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

    postMethods.createPosts(posts);
    addHomePage(posts);
    return 0;
  }
  
}


args.forEach(arg => {
  if(arg === '--help' || arg === '-h') {
    console.log('\x1b[33m%s\x1b[0m' ,'Write simple-ssg1 and add flag -i with txt file as an argument\nWrite simple-ssg1 -v to see the name and version of the tool');
    return 0;
  }

  else if(arg === '--version' || arg === '-v') {
    console.log('\x1b[36m%s\x1b[0m', 'simple-ssg1\nVersion 1.0');
    return 0;
  }

  else if(arg.toLowerCase() === './content'){

    if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);
    
    postMethods.createPosts(posts);
    addHomePage(posts);
    return 0;
  }

  else if(arg.toLowerCase() === 'naval-treaty' ) {
    if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);
    postMethods.createSingle(posts[0]);
    return 0;
  }

  else if(arg.toLowerCase() === 'red-headed-league' ) {
    if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);
    postMethods.createSingle(posts[1]);
    return 0;
  }

  else if(arg.toLowerCase() === 'silver-blaze' ) {
    if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);
    postMethods.createSingle(posts[2]);
    return 0;
  }

  else if(arg.toLowerCase() === 'six-napoleans' ) {
    if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);
    postMethods.createSingle(posts[3]);
    return 0;
  }

  else if(arg.toLowerCase() === 'speckled-band' ) {
   
    if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);
    postMethods.createSingle(posts[4]);
    return 0;
  }

})

if (args.length === 2){
  console.log('You didn\'t specify any flag\n\nUse simple-ssg1 -h for help');
  return -1;
}
