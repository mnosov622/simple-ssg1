# Static site generator

A static site generator is a tool that generates a full static HTML website based on raw data and a set of templates. Essentially, a static site generator automates the task of coding individual HTML pages and gets those pages ready to serve to users ahead of time. Because these HTML pages are pre-built, they can load very quickly in users' browsers.

Static site generators are an alternative to content management systems (CMS) — another type of tool for managing web content, generating webpages, and implementing templates.

# How to get started ?

1. Fork github repo
2. Clone your github repo
3. cd to project folder
4. run `npm install`


# Options

1) `--help` or `-h` to display the usage information

2) Run `--version` or `-v` to display the tool name and version

3) Run `simple-ssg1 [name of the file]` to conver file from txt to html.

# Examples

1) `simple-ssg1 ./content` (convert all files inside content folder into html)

2) `simple-ssg1 silver-blaze` (upper case or lower case, will convert single file into html)

# Optional Features

1) Added default stylesheet file

2) When user specifies a folder (./content) tool will convert all files inside this folder into html files and create home page.
