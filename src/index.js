const fs = require("fs");
const path = require('path')

const postMethods = require("./posts");
const config = require("./config");
const addHomePage = require("./homepage");

const posts = fs
  .readdirSync(config.dev.postsdir)
  .map(post => post.slice(0, -4))
  .map(post => postMethods.createPost(post))
  .sort(function(a, b) {
    return b.attributes.date - a.attributes.date;
  });


if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

postMethods.createPosts(posts);
addHomePage(posts);
