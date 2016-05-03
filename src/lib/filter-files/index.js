'use strict';

/**
 * 
 */

module.exports = (components, name) => {
    console.log(components, name);
    Object.keys(components).forEach(componentName => {
        const component = components[componentName];
        Object.keys(component).forEach(fileName => {
            if (fileName.indexOf(name) === -1) {
                delete components[componentName][fileName];
            }
        });
    });
    return components;
};
