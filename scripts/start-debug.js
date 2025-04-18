const concurrently = require('concurrently');
const upath = require('upath');

const browserSyncPath = upath.resolve(upath.dirname(__filename), '../node_modules/.bin/browser-sync');

concurrently([
    {
        command: 'nodemon --watch src -e scss,js,pug --exec "npm run build"',
        name: 'WATCH',
        prefixColor: 'bgBlue.bold'
    },
    {
        command: `${browserSyncPath} dist -w --no-online`,
        name: 'BROWSER_SYNC',
        prefixColor: 'bgGreen.bold'
    }
], {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 3
}).then(success, failure);

function success() {
    console.log('Development server started successfully!');
}

function failure() {
    console.error('Failed to start development server');
    process.exit(1);
}
