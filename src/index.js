#!/usr/bin/env nodedev

const args = process.argv;
const fs = require("fs");
const path = require('path');

const postMethods = require("./posts");
const configModule = require("./config");
const config = configModule.config;
const addHomePage = require("./homepage");
const { create } = require( "domain" );

const minArgv = require('minimist')(process.argv.slice(2));

var configFile=false;

function createDirIfNotExists() {
  if(!fs.existsSync(config.dev.outdir)) {
    fs.mkdirSync(config.dev.outdir);
  }
}

if(minArgv.config || minArgv.c) {
  //flag for using config file 
  configFile = configModule.setConfig(minArgv.config || minArgv.c);

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
    createDirIfNotExists();

    let input = config.dev.inputPath.replace(".txt", "");
    let post = postMethods.createPost(input);
    postMethods.createSingle(post);
    return 0;
  //if it's a folder
  } 
  
  else {
    //create the file outputs
    createDirIfNotExists();
    postMethods.createPosts(posts);
    addHomePage(posts);
    return 0;
  }
  
}


args.forEach(arg => {
  arg = arg.toLowerCase();

  if(arg === '--help' || arg === '-h') {
    console.log('\x1b[33m%s\x1b[0m' ,'Write simple-ssg1 and add flag -i with txt file as an argument\nWrite simple-ssg1 -v to see the name and version of the tool');
    return 0;
  }

  else if(arg === '--version' || arg === '-v') {
    console.log('\x1b[36m%s\x1b[0m', 'simple-ssg1\nVersion 1.0');
    return 0;
  }

  else if(arg === './content'){
    createDirIfNotExists();
    postMethods.createPosts(posts);
    addHomePage(posts);
    return 0;
  }

  else if(arg === 'naval-treaty' ) {
    createDirIfNotExists();
    postMethods.createSingle(posts[0]);
    return 0;
  }

  else if(arg === 'red-headed-league' ) {
    createDirIfNotExists();
    postMethods.createSingle(posts[1]);
    return 0;
  }

  else if(arg === 'silver-blaze' ) {
    createDirIfNotExists();
    postMethods.createSingle(posts[2]);
    return 0;
  }

  else if(arg === 'six-napoleans' ) {
    createDirIfNotExists();
    postMethods.createSingle(posts[3]);
    return 0;
  }

  else if(arg === 'speckled-band' ) {
    createDirIfNotExists();
    postMethods.createSingle(posts[4]);
    return 0;
  }

})

if (args.length === 2) {
  console.log('You didn\'t specify any flag\n\nUse simple-ssg1 -h for help');
  return -1;
}

