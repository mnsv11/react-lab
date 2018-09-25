import expect from 'expect';
import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import Users from './users';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

function setup() {
    return shallow(<Users />)
}

it('Table enzyme find Header', () => {
    const wrapper = setup();
    expect(wrapper.find('Header').length).toBe(1);
});

it('Table enzyme find Table', () => {
    const wrapper = setup();
    expect(wrapper.find('Table').length).toBe(1);
});

it('Table enzyme find Button', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').text()).toEqual('Add new user');
});

it('Table enzyme find DetailPage', () => {
    const wrapper = setup();
    expect(wrapper.find('DetailPage').length).toBe(1);
});
