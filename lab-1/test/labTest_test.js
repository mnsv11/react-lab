//To run tests: codeceptjs run --steps

Feature('LabTest');

Before( async (I) => { // or Background
    I.amOnPage('/');
});

Scenario('check Users page on site', (I) => {
    I.see('Users');
});

Scenario('Validate errors and add user', async (I) => {
    I.click('Add new user');
    I.see('User details');

    I.fillField({name: 'name'}, 'A');
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
    I.see('Require at least 3 characters');

    I.fillField({name: 'last name'}, 'B');
    I.fillField({name: 'name'}, 'Simon');
    I.click('Save');
    I.see('Require at least 3 characters');

    I.fillField({name: 'last name'}, 'Ericsson');
    I.fillField({name: 'age'}, '0');
    I.click('Save');
    I.see('Age must be larger then 0');

    I.fillField({name: 'age'}, '99');
    I.selectOption('select[name=gender]', '');
    I.click('Save');
    I.see('Require at least 3 characters');

    I.selectOption('select[name=gender]', 'Male');
    I.fillField({name: 'street'}, 'C');
    I.click('Save');
    I.see('Require at least 3 characters');

    I.fillField({name: 'street'}, 'Ronnebygatan');
    I.fillField({name: 'streetNumber'}, '0');
    I.click('Save');
    I.see('Street number must be larger then 0');

    I.fillField({name: 'streetNumber'}, '888');
    I.fillField({name: 'zip'}, 'D');
    I.click('Save');
    I.see('Require at least 3 characters');

    I.fillField({name: 'zip'}, '37300');
    I.fillField({name: 'city'}, 'E');
    I.click('Save');
    I.see('Require at least 3 characters');

    I.fillField({name: 'city'}, 'Karlskrona');
    I.fillField({name: 'country'}, 'F');
    I.click('Save');
    I.see('Require at least 3 characters');

    I.fillField({name: 'country'}, 'Sweden');
    I.fillField({name: 'phone'}, '0');
    I.click('Save');
    I.see('Require at least 3 characters');

    I.fillField({name: 'phone'}, '078945612');
    I.click('Save');

    I.see('Simon', 'tr');
    I.see('Ericsson', 'tr');
    I.see('99', 'tr');
    I.see('Male', 'tr');
    I.see('078945612', 'tr');

});

Scenario('Edit user', async (I) => {
    I.see('Kalle', 'tr');
    I.click('//*[@id="root"]/div/div[2]/div[1]/div[1]/table/tbody/tr[2]/td[1]'); //Xpath
    I.fillField({name: 'name'}, 'Johannes');
    I.click('Save');
    I.see('Johannes', 'tr');
    I.dontSee('Kalle');
});

Scenario('Delete user', async (I) => {
    I.see('Hansson', 'tr');
    I.click('//*[@id="root"]/div/div[2]/div[1]/div[1]/table/tbody/tr[5]/td[1]'); //Xpath
    I.click('Delete user');
    I.dontSee('Hansson');
});

Scenario('Navigate to topic page', async (I) => {
    I.click('Topics');
    I.see('Topics');
});

Scenario('Navigate to about page', async (I) => {
    I.click('About');
    I.see('About');
});
