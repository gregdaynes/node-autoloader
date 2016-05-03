'use strict';

/* global describe it b:true */

// dependencies ===============
const expect = require('chai').expect;
const findComponents = require(`${__dirname}/index.js`);
const dir = `${__dirname}/../../mocks`;

describe('find-components', () => {
    it('should return an object', () => {
        expect(findComponents('filter', 'module', dir)).to.satisfy(isObjects);

        function isObjects(components) {
            if (typeof components === 'object' && !Array.isArray(components)) {
                return true;
            }
            return false;
        }
    });

    it('should contain a module with "module" in the name', () => {
        expect(findComponents('filter', 'module', dir)).to.satisfy(filterForModule);

        function filterForModule(files) {
            const component = files.files[Object.keys(files.files)[0]];
            const componentName = Object.keys(component)[0];
            return componentName.includes('module');
        }
    });

    it('should return empty components when filtering for "apple"', () => {
        expect(findComponents('filter', 'apple', dir)).to.satisfy(filterForApple);

        function filterForApple(files) {
            return (Object.keys(files.files[Object.keys(files.files)[0]]).length === 0);
        }
    });

    it('should return components in path without filtering', () => {
        expect(findComponents(null, null, dir)).to.satisfy(noFilter);

        function noFilter(files) {
            return (Object.keys(files.files[Object.keys(files.files)[0]]).length > 0);
        }
    });
});
