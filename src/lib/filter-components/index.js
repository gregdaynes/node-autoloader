'use strict';

module.exports = (components, name) => {
    const filteredComponents = {};
    Object.keys(components).forEach(componentName => {
        const component = components[componentName];
        filteredComponents[componentName] = {};

        Object.keys(component).forEach(moduleName => {
            if (moduleName.indexOf(name) !== -1) {
                filteredComponents[componentName][moduleName] = components[componentName][moduleName];
            }
        });
    });
    return filteredComponents;
};
