const sh = require('shelljs');
const upath = require('upath');

const destPath = upath.resolve(upath.dirname(__filename), '../dist');

// Create a temporary directory to store files we want to keep
const tempPath = upath.resolve(upath.dirname(__filename), '../temp');
sh.mkdir('-p', tempPath);

// Move files we want to keep to temp directory
sh.mv(`${destPath}/assets`, tempPath);
sh.mv(`${destPath}/index.html`, tempPath);

// Clean the dist directory
sh.rm('-rf', `${destPath}/*`);

// Move files back from temp
sh.mv(`${tempPath}/*`, destPath);

// Remove temp directory
sh.rm('-rf', tempPath);
