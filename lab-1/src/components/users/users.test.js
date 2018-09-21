import expect from 'expect';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Users from './users';


function setup() {
    let output = TestUtils.renderIntoDocument( <Users /> );

    return {
        output
    }
}

describe('Users', () => {
    it('render User div', () => {
        const { output } = setup();
        expect(TestUtils.isCompositeComponent(output)).toBeTruthy();
    });
});