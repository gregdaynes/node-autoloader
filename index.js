'use strict';

// Module dependencies ========
const fs = require('fs');
const path = require('path');

// Module =====================

/**
 * Auto Loading
 * returns object of functions
 * use
    var user = require('loader')('user');
    var userHelper = user.helpers();
    var userRoutes = require('loader')('user').routes();

    var loader = require('loader');
    var fruitHelper = loader('components/fruit').helpers();
    var fruitRoute = loader('components/fruit').routes();

    var a = userHelper.stuff();
    var b = userRoutes.test('yellow', 'banana');
    var c = fruitHelper.color('red');
    var d = fruitRoute.test('orange', 'orange');}
 */
module.exports = function(name, customPath, extension) {
    const files = getDirectory(name, customPath, extension);
    const models = {};

    files.forEach(file => {
        models[path.basename(file)] = () => {
            return require(file);
        }
    });

    return models;
}

// Internal functions =========
function getDirectory(name, extension) {
    let srcpath;

    srcpath = `${__dirname}/${name}`;

    if (fs.statSync(path.join(srcpath)).isDirectory() === false)
        throw new Error('path is not a directory.');

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
