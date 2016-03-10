'use strict';

// Module dependencies ========
const fs = require('fs');
const path = require('path');

// Module =====================

module.exports = (mode, name) => {
    const components = findFiles(mode, name);
    return buildComponents(components);
};

// Internal functions =========

function findFiles(mode, name) {
    const dirname = (module.parent !== 'undefined') ? path.dirname(module.parent.filename) : __dirname;
    const basepath = (process.env.NODE_PATH !== 'undefined') ? dirname : process.env.NODE_PATH;
    if (typeof name === 'undefined') name = mode;
    let searchpath = `${basepath}/${mode}`;

    if (name.split('.').length > 1) searchpath = path.dirname(searchpath);

    let files = getDirectory(searchpath);
    if (mode === 'filter') files = filterFiles(files, path.basename(name, path.extname(name)));

    return { files, mode };
}

function filterFiles(components, name) {
    Object.keys(components).forEach(componentName => {
        const component = components[componentName];
        if (typeof component[name] === 'undefined') {
            delete components[componentName];
        } else {
            Object.keys(component).forEach(moduleName => {
                if (moduleName !== name) {
                    delete components[componentName][moduleName];
                }
            });
        }
    });
    return components;
}

function buildComponents(objects) {
    if (typeof objects === 'undefined') return;
    const components = objects.files;
    const mode = objects.mode;
    const readyComponents = {};

    Object.keys(components).forEach(componentName => {
        const component = {paths: {}};
        const modules = components[componentName];
        Object.keys(modules).forEach(moduleName => {
            if (moduleName === 'index') {
                component.paths.component = modules[moduleName];
                component.component = () => {
                    return require(modules[moduleName]);
                };
            }

            if (mode === 'filter') {
                if (typeof readyComponents[moduleName] === 'undefined') {
                    readyComponents[moduleName] = {};
                    readyComponents.paths = {};
                }

                readyComponents[moduleName][componentName] = modules[moduleName];
                readyComponents.paths[componentName] = modules[moduleName];
            } else {
                component.paths[moduleName] = modules[moduleName];
                component[moduleName] = () => {
                    return require(modules[moduleName]);
                };
            }
        });

        if (mode !== 'filter') readyComponents[componentName] = component;
    });

    if (Object.keys(readyComponents).length === 1) {
        const single = Object.keys(readyComponents)[0];
        return readyComponents[single];
    }

    return readyComponents;
}

// Load based on component
function getDirectory(srcpath, extension) {
    const files = walk(srcpath);
    const name = path.basename(srcpath);
    const modules = {};
    files.forEach(fullPath => {
        const componentName = path.basename(path.dirname(fullPath));
        const filename = path.basename(fullPath, path.extname(fullPath));
        if (typeof modules[componentName] === 'undefined') {
            modules[componentName] = {};
        }
        modules[componentName][filename] = fullPath;
    });
    return modules;
}

function walk(dir) {
    if (path.basename(dir) === 'node_modules'
       || path.basename(dir) === '.git') return;
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(walk(file));
        else results.push(file)
    })
    return results
}
