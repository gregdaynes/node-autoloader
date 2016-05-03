'use strict';

/**
 * findFiles
 * @param   findBy  string  filter; component;
 * @param   pattern string  text to look for in filenames
 * @return  object          { [files], 'findBy' }
 */

// dependencies ===============
const path = require('path');
const moduleTree = require('../module-tree');
const filterFiles = require('../filter-components');

// @TODO reduce statement count;
module.exports = (findBy, pattern, findLocation) => {
    const dirname = (module.parent !== undefined)
        ? path.dirname(module.parent.filename)
        : __dirname;

    const basepath = (process.env.NODE_PATH !== undefined)
        ? process.env.NODE_PATH
        : dirname;

    if (findLocation === undefined) {
        findLocation = `${basepath}`;
    }

    let files = moduleTree(findLocation);
    if (findBy === 'filter') {
        files = filterFiles(files, path.basename(pattern, path.extname(pattern)));
    }

    return { files, findBy };
};
