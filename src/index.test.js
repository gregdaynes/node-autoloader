/* global describe it b:true */

const expect = require('chai').expect;
const tinyLoad = require('../src/index.js');

// describe('exampleModule', () => {
//     describe('functionName', () => {
//         it('should be an array of strings', () => {
//             expect(exampleModule.functionName.all).to.satisfy(isArrayOfStrings);
//
//             function isArrayOfStrings(array) {
//                 return array.every(function(item) {
//                     return typeof item === 'string';
//                 });
//             }
//         });
//     });
// });

describe('tiny-load', () => {
    describe('testing library is ok', () => {
        it('should return true', () => true);
    });
});
