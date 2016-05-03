'use strict';

module.exports = (objects) => {
    if (typeof objects === 'undefined') return objects;
    const components = objects.files;
    const mode = objects.mode;
    const readyComponents = {};

    Object.keys(components).forEach(componentName => {
        const component = {paths: {}};
        const modules = components[componentName];
        Object.keys(modules).forEach(moduleName => {
            if (moduleName === 'index') {
                component.paths.component = modules[moduleName];
                component.component = () => require(modules[moduleName]);
            }

            if (mode === 'filter') {
                if (typeof readyComponents[moduleName] === 'undefined') {
                    readyComponents[moduleName] = {};
                    readyComponents.paths = {};
                }

                readyComponents[moduleName][componentName] = () => require(modules[moduleName]);
                readyComponents.paths[componentName] = modules[moduleName];
            } else {
                component.paths[moduleName] = modules[moduleName];
                component[moduleName] = () => require(modules[moduleName]);
            }
        });

        if (mode !== 'filter') readyComponents[componentName] = component;
    });

    return readyComponents;
};
