'use strict';

// Module dependencies ========
const findComponents = require('./lib/find-components');
const buildComponents = require('./lib/build-components');
const flattenComponents = require('./lib/flatten-components');

// Module =====================

module.exports = (mode, name) => {
    const components = findComponents(mode, name);
    const builtComponents = buildComponents(components);
    return flattenComponents(builtComponents);
};
