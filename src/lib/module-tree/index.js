'use strict';

// dependencies
const walk = require('../walk');
const path = require('path');

module.exports = (dir) => {
    const files = walk(dir);
    const modules = {};

    files.forEach(fsItemPath => {
        const componentName = path.basename(path.dirname(fsItemPath));
        const filename = path.basename(fsItemPath, path.extname(fsItemPath));
        if (modules[componentName] === undefined) {
            modules[componentName] = {};
        }
        modules[componentName][filename] = fsItemPath;
    });

    return modules;
};
