'use strict';

module.exports = (components) => {
    Object.keys(components).forEach(ComponentKey => {
        const component = components[ComponentKey];
        const componentKeys = Object.keys(component);
        if (componentKeys.length > 0) {
            const splitName = ComponentKey.split('.');
            components[splitName[0]] = components[ComponentKey][splitName[0]];
        }
    });
    return components;
};
