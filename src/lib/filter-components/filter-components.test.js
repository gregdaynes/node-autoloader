'use strict';

/* global describe it b:true */

// dependencies ===============
const expect = require('chai').expect;
const filterFiles = require(`${__dirname}/index.js`);
const components = {
    'component-one': {
        index: '../../mocks/component-one/index.js',
        'mocks.module': '../../mocks/component-one/mocks.model.js',
        'mocks.model': '../../mocks/component-one/mocks.module.js',
        'mocks.routes': '../../mocks/component-one/mocks.routes.js',
    },
    'component-two': {
        index: '../../mocks/component-two/index.js',
        'mocks.model': '../../mocks/component-two/mocks.model.js',
        'mocks.module': '../../mocks/component-two/mocks.module.js',
        'mocks.routes': '../../mocks/component-two/mocks.routes.js',
    },
};

describe('filterFiles', () => {
    it('should contain a module with "module" in the name', () => {
        expect(filterFiles(components, 'module')).to.satisfy(results => {
            if (typeof results === 'object' && Array.isArray(results)) {
                return false;
            }

            const componentNames = Object.keys(results)[0];
            const modulesName = Object.keys(results[componentNames])[0];
            return modulesName.includes('module');
        });
    });

    it('should not contain a module with "apple" in the name', () => {
        expect(filterFiles(components, 'apple')).to.satisfy(results => {
            const componentNames = Object.keys(results)[0];
            if (Object.keys(results[componentNames]).length === 0) {
                return true;
            }
            return false;
        });
    });
});
