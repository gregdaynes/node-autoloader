'use strict';

/* global describe it b:true */

// dependencies ===============
const expect = require('chai').expect;
const moduleTree = require(`${__dirname}/index.js`);
const dir = `${__dirname}/../../mocks`;

describe('module-tree', () => {
    it('should be an object', () => {
        expect(moduleTree(dir)).to.satisfy(results => {
            if (typeof results === 'object' && !Array.isArray(results)) {
                return true;
            }
            return false;
        });
    });

    it('should contain a nested object', () => {
        expect(moduleTree(dir)).to.satisfy(results => {
            const nested = Object.keys(results)[0];
            if (typeof results[nested] === 'object' && !Array.isArray(results[nested])) {
                return true;
            }
            return false;
        });
    });

    it('nested object values should be string', () => {
        expect(moduleTree(dir)).to.satisfy(results => {
            const nested = Object.keys(results)[0];
            const nestedModuleKey = Object.keys(results[nested])[0];
            return typeof results[nested][nestedModuleKey] === 'string';
        });
    });
});
