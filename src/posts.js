const configModule = require("./config");
const config = configModule.config;
const fm = require("front-matter");
const fs = require("fs");
const marked = require("./marked");

let args = process.argv;

//default is english
let lang="en";

//add the language into args to be use the original desgin while using config file values
const setLanguage = () => {
  args.push(config.dev.lang);
  
  // language will be set based on the argument passed 
  lang = args[2];
  console.log(args);
};

//default stylesheet
const setStyle = () => {
  stylesheet = config.dev.stylesheet;
};

const posthtml = data => `
<!DOCTYPE html>
<html lang="${lang}">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href = "../../src/assets/style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="${stylesheet}" rel="stylesheet">

    </head>
    <body>
        <div class="grotesk">
            <header>
            </header>

            <div class="content">
                <hr />
                ${data.body}
            </div>

        </div>
    </body>
</html>
`;

const createPost = postPath => {
  setLanguage();
  setStyle();
  const data = fs.readFileSync(`${config.dev.postsdir}/${postPath}.txt`, "utf8");
  const content = fm(data);
  content.body = marked(content.body);
  content.path = postPath;
  return content;
};

const createPosts = posts => {
  setLanguage();
  setStyle();
  posts.forEach(post => {
    if (!fs.existsSync(`${config.dev.outdir}/${post.path}`)) {
      fs.mkdirSync(`${config.dev.outdir}/${post.path}`);
    }

    fs.writeFile(
      `${config.dev.outdir}/${post.path}/index.html`,
      posthtml(post),
      e => {
        if (e) {
          throw e;
        }

        console.log(`${post.path}/index.html was created successfully`);
      }
    );
  });
};

const createSingle = post => {
  setLanguage();
  setStyle();

  if (!fs.existsSync(`${config.dev.outdir}/${post.path}`)) {
    fs.mkdirSync(`${config.dev.outdir}/${post.path}`);
  }

    fs.writeFile(
      `${config.dev.outdir}/${post.path}/index.html`,
      posthtml(post),
      e => {
        if (e) {
          throw e;
        }

        console.log(`${post.path}/index.html was created successfully`);
      }
    );
}

module.exports = {
  createPost: createPost,
  createPosts: createPosts,
  createSingle: createSingle,
};
