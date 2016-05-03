'use strict';

/**
 * findFiles
 * @param   findBy  string  filter; component;
 * @param   pattern string  text to look for in filenames
 * @return  object          { [files], 'findBy' }
 */

// dependencies ===============
const path = require('path');
const getDirectory = require('../module-tree');
const filterFiles = require('../filter-files');

// @TODO reduce statement count;
module.exports = (findBy, pattern, findLocation) => {
    let dirname;
    let basepath;
    // let pattern;
    // let findLocation;
    let files;

    if (module.parent !== 'undefined') {
        dirname = path.dirname(module.parent.filename);
    } else {
        dirname = __dirname;
    }

    if (process.env.NODE_PATH !== undefined) {
        basepath = dirname;
    } else {
        basepath = process.env.NODE_PATH;
    }

    if (pattern === 'undefined') {
        pattern = findBy;
    }

    if (findLocation === undefined) {
        findLocation = `${basepath}/${pattern}`;
    }

    if (pattern.split('.').length > 1) {
        findLocation = path.dirname(findLocation);
    }

    files = getDirectory(findLocation);

    if (findBy === 'filter') {
        files = filterFiles(files, path.basename(pattern, path.extname(pattern)));
    }

    return { files, findBy };
};

