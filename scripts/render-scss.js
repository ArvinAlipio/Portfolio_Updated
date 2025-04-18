'use strict';

const sass = require('sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const upath = require('upath');
const sh = require('shelljs');

const stylesPath = upath.resolve(upath.dirname(__filename), '../src/scss');
const destPath = upath.resolve(upath.dirname(__filename), '../dist/css');

sh.mkdir('-p', destPath);

const files = sh.find(stylesPath).filter(file => file.match(/\.scss$/));

files.forEach(file => {
    const destFile = upath.changeExt(upath.basename(file), '.css');
    const dest = upath.resolve(destPath, destFile);
    
    // Compile SCSS to CSS
    const result = sass.renderSync({
        file: file,
        outputStyle: 'expanded',
        sourceMap: true
    });

    // Process with PostCSS
    postcss([autoprefixer, cssnano])
        .process(result.css, {
            from: file,
            to: dest,
            map: {
                inline: false,
                prev: result.map
            }
        })
        .then(result => {
            sh.mkdir('-p', upath.dirname(dest));
            sh.cp('-R', file, dest);
            sh.cp('-R', file, `${dest}.map`);
        })
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
});
