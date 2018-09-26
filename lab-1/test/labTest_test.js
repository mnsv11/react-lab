//To run tests: codeceptjs run --steps

Feature('LabTest');

Before( async (I) => { // or Background
    I.amOnPage('/');
});

Scenario('check Welcome page on site', (I) => {
    I.see('Users');
});

Scenario('Add new user', async (I) => {
    I.click('Add new user');

    I.fillField({name: 'name'}, 'Simon');
    I.fillField({name: 'last name'}, 'Ericsson');
    I.fillField({name: 'age'}, '99');
    I.selectOption('select[name=gender]', 'Male');
    I.fillField({name: 'street'}, 'Ronnebygatan');
    I.fillField({name: 'streetNumber'}, '888');
    I.fillField({name: 'zip'}, '37300');
    I.fillField({name: 'city'}, 'Karlskrona');
    I.fillField({name: 'country'}, 'Sweden');
    I.fillField({name: 'phone'}, '078945612');

    I.click('Save');

    I.see('Simon', 'tr');
    I.see('Ericsson', 'tr');
    I.see('99', 'tr');
    I.see('Male', 'tr');
    I.see('078945612', 'tr');

});
