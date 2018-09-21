import expect from 'expect';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Table from './table';


function setup() {

    let props = {
        header: [{value: 'Name', type: 'string'}],
        values: [{value: 'Name', type:'string'}],
        tableClick: () => {}
    };
    let table = TestUtils.renderIntoDocument( <Table {...props}/> );
    let header = TestUtils.scryRenderedDOMComponentsWithClass(table, 'table');

    return {
        table: table,
        header: header
    }
}

describe('Table', () => {
    it('render table', () => {
        const { table } = setup();
        expect(TestUtils.isCompositeComponent(table)).toBeTruthy();
    });


    it('render table header', () => {
        const { header } = setup();
        expect(header[0].textContent).toEqual('Name');
    });
});