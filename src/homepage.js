const configModule = require("./config");
const config = configModule.config;
const fs = require("fs");

const homepage = posts => `
<!DOCTYPE html>
<html lang="${config.dev.lang}">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href = "../../src/assets/style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="${config.dev.stylesheet}" rel="stylesheet">
        
        <title>${config.blogName}</title>
    </head>
    <body>
        <div class="grotesk">
            <header>
               
            </header>
            
            <div class="posts">
                <a href = '../dist/naval-treaty/index.html'/>
                <a href = '../dist/red-headed-league/index.html'/>
                <a href = '../dist/silver-blaze/index.html'/>
                <a href = '../dist/six-neapolis/index.html'/>
                <a href = '../dist/speckled-band/index.html'/>
            </div>

            <footer>
             
            </footer>
        </div>
    </body>
</html>
`;

const addHomePage = posts => {
  fs.writeFile(`${config.dev.outdir}/index.html`, homepage(posts), e => {
    if (e) {
        throw e;
    }
    console.log(`index.html was created successfully`);
  });
};

module.exports = addHomePage;
