'use strict';

// Module dependencies ========
const findFiles = require('./lib/find-files/find-files.js');
const buildComponents = require('./lib/build-components');
const flattenComponents = require('./lib/flatten-components');

// Module =====================

module.exports = (mode, name) => {
    const components = findFiles(mode, name);
    const builtComponents = buildComponents(components);
    return flattenComponents(builtComponents);
};
