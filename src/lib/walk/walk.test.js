'use strict';

/* global describe it b:true */

// dependencies ===============
const expect = require('chai').expect;
const path = require('path');
const walk = require('./index.js');
const dir = '../../mocks';

describe('walk', () => {
    it('return an array', () => (walk(dir).isArray));

    it('should contain an index.js', () => {
        expect(walk(dir)).to.satisfy(containsIndex);

        function containsIndex(array) {
            for (let i = 0; i < array.length; i++) {
                if (path.basename(array[i]) === 'index.js') {
                    i = array.length;
                    return true;
                }
            }
            return false;
        }
    });
});
