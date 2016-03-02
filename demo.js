'use strict';

const debug = require('debug');
const log = debug('log');

// -------------------------------------
log('start');
var user = require('loader')('user');
var userHelper = user.helpers();
var userRoutes = require('loader')('user').routes();

var loader = require('loader');
var fruitHelper = loader('components/fruit').helpers();
var fruitRoute = loader('components/fruit').routes();

var a = userHelper.stuff();
var b = userRoutes.test('yellow', 'banana');
var c = fruitHelper.color('red');
var d = fruitRoute.test('orange', 'orange');

log('fin');
console.log(a,b,c,d);
