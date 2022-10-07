const config = require("./config");
const fm = require("front-matter");
const fs = require("fs");
const marked = require("./marked");

fs.readFile('./content/silver-blaze.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  // Converting Raw Buffer to text
  // data using tostring function.
  // console.log(data.split(/\r?\n/));
})

const args = process.argv;

//default is english
let lang = config.dev.lang;
let stylesheet=config.dev.stylesheet;

args.forEach(arg => {
      if(arg === 'fr') {
        lang = 'fr';
      }
      
      else if (arg === 'pt-BR') {
        lang = 'pt-BR';
      }
      
      else if (arg === 'ru') {
        lang = 'ru';
      }

      else if (arg === 'uk') {
        lang = 'uk';
      }

      else if (arg === 'en-GB') {
        lang = 'en-GB';
      }

      else if (arg === 'de') {
        lang = 'de';
      }

      else if (arg === 'es') {
        lang = 'es';
      }

      else if (arg === 'ja') {
        lang = 'ja';
      }

      else if (arg === 'ko') {
        lang = 'ko';
      }
})


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
  const data = fs.readFileSync(`${config.dev.postsdir}/${postPath}.txt`, "utf8");
  const content = fm(data);
  content.body = marked(content.body);
  content.path = postPath;
  return content;
};

const createPosts = posts => {
  posts.forEach(post => {
    if (!fs.existsSync(`${config.dev.outdir}/${post.path}`))
      fs.mkdirSync(`${config.dev.outdir}/${post.path}`);

    fs.writeFile(
      `${config.dev.outdir}/${post.path}/index.html`,
      posthtml(post),
      e => {
        if (e) throw e;
        console.log(`${post.path}/index.html was created successfully`);
      }
    );
  });
};

const createSingle = post => {
  if (!fs.existsSync(`${config.dev.outdir}/${post.path}`))
      fs.mkdirSync(`${config.dev.outdir}/${post.path}`);

    fs.writeFile(
      `${config.dev.outdir}/${post.path}/index.html`,
      posthtml(post),
      e => {
        if (e) throw e;
        console.log(`${post.path}/index.html was created successfully`);
      }
    );
}

module.exports = {
  createPost: createPost,
  createPosts: createPosts,
  createSingle: createSingle
};
