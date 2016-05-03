'use strict';

// dependencies ===============
const reduceFiles = require('../reduce-files');

module.exports = (components) => {
    const componentNames = Object.keys(components);
    componentNames.forEach((name, index) => {
        if (name === 'paths' || name === 'component' || name === 'index') {
            componentNames.splice(index, 1);
        }
    });

    if (componentNames.length === 1) {
        const flattenedComponents = {};
        Object.keys(components[componentNames[0]]).forEach(componentName => {
            flattenedComponents[componentName] = components[componentNames[0]][componentName];
        });
        flattenedComponents.paths = components.paths;
        return flattenedComponents;
    }

    components = reduceFiles(components);

    return components;
};
