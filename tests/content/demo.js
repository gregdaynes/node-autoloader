'use strict';

const debug = require('debug');
const log = debug('log');
const logFull = debug('log:full');

// -------------------------------------
logFull('start');

// component loader
log('component');
const user = require('../../index.js')('tests/content/user');
const userHelper = user.helpers();
const userRoutes = require('../../index.js')('tests/content/user').routes();

const loader = require('../../index.js');
const fruitHelper = loader('tests/content/components/fruit').helpers();
const fruitRoute = loader('tests/content/components/fruit').routes();
log('/component');

// Global loader
log('global');
const routes = require('../../index.js')('type', 'routes.js');
const routesFruit = routes.fruit();
const routesUser = require('../../index.js')('type', 'routes.js').user();
log('/global');

// Folder loader
log('folder');
const folder = require('../../index.js')('folder', 'tests/content/routes');
const folderFruit = folder.fruit();
log('/folder');

logFull('fin');

const a = userHelper.stuff();
const b = userRoutes.test('yellow', 'banana');
const c = fruitHelper.color('red');
const d = fruitRoute.test('orange', 'orange');
const e = routesFruit.test('green', 'lime');
const f = routesUser.test('red', 'apple');
const g = folderFruit.test('pink', 'grapefruit');

console.log(a,b,c,d,e,f,g);
