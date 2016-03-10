'use strict';

// Module dependencies ========
const fs = require('fs');
const path = require('path');

// Module =====================
let globalType;

module.exports = (type, name, extension) => {
    const files = decider(type, name, extension);
    files.forEach(constructor, files);
    const filesReduced = files.reduce(reductor, { paths: {} });
    return filesReduced;
};

// Internal functions =========

function constructor(file, index, arr) {
    const model = { paths: {}};
    let moduleName = path.basename(file, path.extname(file));
    if (globalType === 'type') moduleName = path.basename(path.dirname(file));
    if (path.basename(file, path.extname(file)) === 'index') {
        model.paths.component = file;
        model.component = () => {
            return require(file);
        };
    }
    model.paths[moduleName] = file;
    model[moduleName] = () => {
        return require(file);
    };
    arr[index] = model;
}

function reductor(acc, item, index, arr) {
    Object.keys(item).forEach(name => {
        if (name === 'paths') {
            Object.keys(item[name]).forEach(pathName => {
                acc.paths[pathName] = item.paths[pathName];
            });
        } else {
            acc[name] = item[name];
        }
    });

    return acc;
}

function decider(type, name, extension) {
    let srcpath;
    let files;
    const dirname = (module.parent !== 'undefined') ? path.dirname(module.parent.filename) : __dirname;
    const basepath = (process.env.NODE_PATH !== 'undefined') ? dirname : process.env.NODE_PATH;

    switch (type) {
        case 'type':
            globalType = 'type'
            srcpath = `${basepath}/${path.dirname(name)}`;
            files = findFiles(srcpath, path.basename(name));
            break;

        case 'folder':
            globalType = 'folder'
            name = (path.dirname(name) === '.') ? `${name}` : name;
            srcpath = `${basepath}/${name}`;
            files = findFilesInFolder(srcpath);
            break;

        default:
            name = type;
            type = false;
            globalType = false;
            srcpath = `${basepath}/${name}`;
            files = getDirectory(srcpath, extension);
            break;
    }

    if (fs.statSync(path.join(srcpath)).isDirectory() === false) {
        throw new Error('path is not a directory.');
    }

    return files;
}

// Load based on component

function getDirectory(srcpath, extension) {
    const name = path.basename(srcpath);
    const files = fs.readdirSync(srcpath);
    files.forEach((file, index) => {
        const filename = file.split('.');
        if (typeof extension === 'undefined') {
            extension = filename[filename.length - 1];
        }
        files[index] = filename.reduce((acc, item) => {
            if (item !== name && item !== extension) {
                const newPath = `${srcpath}/${item}`;
                acc = acc + newPath;
            }
            return acc;
        }, []);
    });

    return files;
}

// Load based on filename

function findFiles(srcpath, filename) {
    const foundFiles = [];
    findInDir(srcpath, filename, (filepath) => {
        foundFiles.push(filepath);
    });
    return foundFiles;
}

function findInDir(startPath, filter, callback) {
    if (!fs.existsSync(startPath)) return;

    const ignores = ['node_modules', '.git'];
    const folderName = path.basename(path.dirname(startPath));
    if (ignores.indexOf(folderName) > -1) return;

    const files = fs.readdirSync(startPath);
    files.forEach(file => {
        const filename = path.join(startPath, file);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            findInDir(filename, filter, callback);
        } else {
            if (filter === path.basename(filename)) callback(filename);
        }
    });
}

// Load based on folder

function findFilesInFolder(srcpath) {
    const files = fs.readdirSync(srcpath);

    files.forEach((file, index) => {
        files[index] = `${srcpath}/${file}`;
    });

    return files;
}
