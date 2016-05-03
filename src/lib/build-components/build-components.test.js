'use strict';

/* global describe it b:true */

// dependencies ===============
const expect = require('chai').expect;
const buildComponents = require('./index.js');
const components = {
    files: {
        'component-one': {
            'mocks.module': '../../mocks/component-one/mocks.module.js',
        },
        'component-two': {
            'mocks.module': '../../mocks/component-two/mocks.module.js',
        },
    },
    findBy: 'filter',
};

describe('build-components', () => {
    it('should contain more than one object keys', () => {
        expect(buildComponents(components)).to.satisfy(results => Object.keys(results).length > 1);
    });

    it('should contain a key called paths', () => {
        expect(buildComponents(components)).to.satisfy(hasPathsKey);

        function hasPathsKey(results) {
            const keys = Object.keys(results);
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].indexOf('paths') !== -1) {
                    return true;
                }
            }
            return false;
        }
    });

    it('should have paths object with same number of keys minus one', () => {
        expect(buildComponents(components)).to.satisfy(keysCount);

        function keysCount(results) {
            const pathCount = Object.keys(results.paths).length;
            let componentCount = 0;
            delete results.paths;

            Object.keys(results).forEach(module => {
                componentCount = componentCount + Object.keys(results[module]).length;
            });

            return (componentCount === pathCount);
        }
    });

    it('should have components be functions', () => {
        expect(buildComponents(components)).to.satisfy(isFunction);

        function isFunction(results) {
            return (typeof results['mocks.module']['component-one'] === 'function');
        }
    });

    it('should have paths be strings', () => {
        expect(buildComponents(components)).to.satisfy(isString);

        function isString(results) {
            return (typeof results.paths['component-one'] === 'string');
        }
    });
});
