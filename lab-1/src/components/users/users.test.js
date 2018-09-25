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

it('Users find Header', () => {
    const wrapper = setup();
    expect(wrapper.find('Header').length).toBe(1);
});

it('Users find Table', () => {
    const wrapper = setup();
    expect(wrapper.find('Table').length).toBe(1);
});

it('Users find Button', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').text()).toEqual('Add new user');
});

it('Users find DetailPage', () => {
    const wrapper = setup();
    expect(wrapper.find('DetailPage').length).toBe(1);
});
