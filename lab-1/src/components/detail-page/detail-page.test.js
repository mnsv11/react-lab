import expect from 'expect';
import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import DetailPage from './detail-page';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

function setup() {

    let props = {
        state: {
            id: 0,
            name: "Kalle",
            "last name": "Svensson",
            gender: "Male",
            age: 33,
            street: "Ronnebygatan",
            streetNumber: 11,
            city: "Karlskrona",
            zip: "37300",
            country: "Sweden",
            phone: "0703789456",
        },
        errors: {},
        updateUser: () => {},
        save: () => {},
        deleteUser: () => {}
    };

    return shallow(<DetailPage {...props}/>)
}

it('DetailPage find header h1', () => {
    const wrapper = setup();

    expect(wrapper.find('h1').text()).toEqual('User details');
});

it('DetailPage find inputs', () => {
    const wrapper = setup();

    expect(wrapper.find('Input').length).toBe(9); //Find by element
});

it('DetailPage find Select box', () => {
    const wrapper = setup();

    expect(wrapper.find('Select').length).toBe(1);
});

it('DetailPage check button texts', () => {
    const wrapper = setup();
    const texts = wrapper.find('.details-content-row3-button').map(node => node.text()); //Find by class name
    expect(texts).toEqual(['Save', 'Delete user']);
});