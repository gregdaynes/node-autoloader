'use strict';

// Module dependencies ========
const fs = require('fs');
const path = require('path');

// Module =====================

/**
 * Auto Loading
 * returns object of functions
 * use
     // component loader
     var user = require('./index')('user');
     var userHelper = user.helpers();
     var userRoutes = require('./index')('user').routes();

     var loader = require('./index');
     var fruitHelper = loader('components/fruit').helpers();
     var fruitRoute = loader('components/fruit').routes();

     // Global loader
     var routesFruit = require('./index')(true, 'routes.js').fruit();
     var routesUser = require('./index')(true, 'routes.js').user();


     var a = userHelper.stuff();
     var b = userRoutes.test('yellow', 'banana');
     var c = fruitHelper.color('red');
     var d = fruitRoute.test('orange', 'orange');
     var e = routesFruit.test('green', 'lime');
     var f = routesUser.test('red', 'apple');
 */
module.exports = function(type, name, extension) {
    if (type !== true) {
        name = type;
        type = false;
    }

    const files = decider(name, extension, type);
    const models = {};

    files.forEach(file => {
        let moduleName = path.basename(file, path.extname(file));
        if (type === true) moduleName = path.basename(path.dirname(file));
        models[moduleName] = () => {
            return require(file);
        }
    });

    return models;
}

// Internal functions =========
function decider(name, extension, type) {
    let srcpath = (type === true)
        ? `${__dirname}/${path.dirname(name)}`
        : `${__dirname}/${name}`;

    if (fs.statSync(path.join(srcpath)).isDirectory() === false)
        throw new Error('path is not a directory.');

    if (type === true) {
        return findFiles(srcpath, path.basename(name));
    } else {
        return getDirectory(name, extension);
    }
}

function getDirectory(name, extension) {
    let srcpath = `${__dirname}/${name}`;

    let files = fs.readdirSync(srcpath);
    files.forEach((file, index) => {
        let filename = file.split('.');
        if (typeof extension === 'undefined')
            extension = filename[filename.length - 1];

        files[index] = filename.reduce((acc, item, index, array) => {
            if (item !== name && item !== extension)
                acc = acc + `${srcpath}/${item}`;
            return acc;
        }, []);
    });

    return files;
}

function findFiles(srcpath, filename) {
    const foundFiles = [];
    findInDir(srcpath, filename, function(filepath){
        foundFiles.push(filepath);
    });
    return foundFiles;
}

function findInDir(startPath, filter, callback) {
    if (!fs.existsSync(startPath)) return;

    const files = fs.readdirSync(startPath);

    files.forEach(file => {
        const filename = path.join(startPath, file);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory())
            findInDir(filename, filter, callback);
        else
            if (filter === path.basename(filename)) callback(filename);
    });
};
