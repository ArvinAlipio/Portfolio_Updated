'use strict';

const upath = require('upath');
const sh = require('shelljs');

const srcPath = upath.resolve(upath.dirname(__filename), '../src/js');
const destPath = upath.resolve(upath.dirname(__filename), '../dist/js');

sh.mkdir('-p', destPath);

// Copy all JS files
sh.find(srcPath).forEach(file => {
    if (file.match(/\.js$/)) {
        const destFile = upath.basename(file);
        const dest = upath.resolve(destPath, destFile);
        sh.cp(file, dest);
    }
});

// Copy Bootstrap JS bundle
const bootstrapPath = upath.resolve(upath.dirname(__filename), '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
sh.cp(bootstrapPath, upath.resolve(destPath, 'bootstrap.bundle.min.js'));