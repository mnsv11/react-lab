import expect from 'expect';
import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import Table from './table';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

function setup() {

    let props = {
        header: [{value: 'Name', type: 'string'}, {value: 'Last name', type: 'string'}],
        values: [{name: 'Kalle', 'last name': 'Svensson'}],
        tableClick: () => {}
    };

    return shallow(<Table {...props}/>)
}

it('Table find table', () => {
   const wrapper = setup();

   expect(wrapper.find('table').length).toBe(1);
});

it('Table find table head', () => {
    const wrapper = setup();

    expect(wrapper.find('th').length).toBe(2);
});

it('Table check table head values', () => {
    const wrapper = setup();

    const texts = wrapper.find('th').map(node => node.text());
    expect(texts).toEqual(['Name', 'Last name']);
});

it('Table find table rows', () => {
    const wrapper = setup();

    expect(wrapper.find('tr').length).toBe(2);
});

it('Table find table cell', () => {
    const wrapper = setup();

    expect(wrapper.find('td').length).toBe(2);
});

it('Table check row values', () => {
    const wrapper = setup();

    const texts = wrapper.find('td').map(node => node.text());
    expect(texts).toEqual(['Kalle', 'Svensson']);
});