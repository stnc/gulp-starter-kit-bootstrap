# Gulp Starter Kit For Bootsrap

> A simple Gulp 4 Starter Kit for Bootstrap 

## Features / Use Cases
This Gulp Starter Kit provides a simple way of setting up a modern web development environment.
Here is a list of the current features:

- Copy HTML files from `src` to `dist` directory
- Autoprefix and minify CSS and put it inside `dist` directory
- Compile ES6+ to ES5, concatenate JS files and minify code
- Compress and copy images into `dist` directory
- Copy dependencies specified in `package.json` from `src/node_modules` directory into `node_modules` folder inside `dist` directory
- Import dependencies into your application with ES6 modules
- Spin up local dev server at `http://localhost:3000` including auto-reloading

## Prerequisites

1. Node.js + npm
2. Gulp installed globally: `npm install gulp --global`
3. __Windows users__: Windows Build Tools: `npm install --global --production windows-build-tools`. Make sure to run this as an administrator.

## Usage

### 1. Clone repo
```
git clone https://github.com/marcinkrzeminski/gulp-starter-kit.git
```

### 2. Go inside cloned repo
```
cd gulp-starter-kit
```

### 3. Install all dependencies (make sure nodejs with npm is installed on your machine)
```
npm install
```

### 4. Run default gulp task (will open browser window with live reload)
```
gulp
```

## Dependencies
These [npm](https://www.npmjs.com/) packages are used in the Gulp Starter Kit:

- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [browser-sync](https://www.npmjs.com/package/browser-sync)
- [del](https://www.npmjs.com/package/del)
- [gulp](https://www.npmjs.com/package/gulp)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-babel](https://www.npmjs.com/package/gulp-babel)
- [gulp-concat](https://www.npmjs.com/package/gulp-concat)
- [gulp-dependents](https://www.npmjs.com/package/gulp-dependents)
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
- [webpack-stream](https://www.npmjs.com/package/webpack-stream)


For more information, take a look at the [package.json](package.json) file or visit the linked npm package sites.



SPECIAL THANKS 

Start Bootstrap - Bare](https://startbootstrap.com/template-overviews/bare/)

https://github.com/jr-cologne/gulp-starter-kit

https://github.com/una/gulp-starter-env/blob/master/gulpfile.js

https://coderwall.com/p/xyi9ww/simple-gulp-starter

https://github.com/marcinkrzeminski/gulp-starter-kit