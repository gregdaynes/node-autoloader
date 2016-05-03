'use strict';

// dependencies ===============
const path = require('path');
const fs = require('fs');

const ignoreFolders = [
    'node_modules',
    '.git',
];
const ignoreFiles = [
    '.DS_Store',
    'package.json',
];

module.exports = (dir) => walk(dir);

function walk(dir) {
    if (ignoreFolders.indexOf(path.basename(dir)) !== -1) {
        return null;
    }

    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach(fsItem => { // files and folders, hence fsItem
        const fsItemPath = `${dir}/${fsItem}`;
        const stat = fs.statSync(fsItemPath);

        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fsItemPath));
        } else if (ignoreFiles.indexOf(path.basename(fsItemPath)) === -1) {
            results.push(fsItemPath);
        }
    });

    return results;
}
