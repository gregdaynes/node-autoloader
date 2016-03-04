'use strict';

const debug = require('debug');
const log = debug('log');

// -------------------------------------
log('start');

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

log('fin');
console.log(a,b,c,d,e,f);
