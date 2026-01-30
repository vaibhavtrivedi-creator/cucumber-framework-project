const { Given, When, Then } = require("@cucumber/cucumber");
const POManager = require("../../tests/POManager/POManager");

Given('I am on the registration page', { timeout: 20000 }, async function () {
    this.poManager = new POManager(this.page);
    this.registrationPage = this.poManager.getRegistrationPage();
    await this.registrationPage.navigateToRegistrationPage();
});

When('I submit the form with blank fields', async function () {
    await this.registrationPage.clickSignUpButton();
});

Then('error messages should be displayed for all required fields', async function () {
    await this.registrationPage.blankFieldValidation();
});

When('I fill in the registration form with an invalid First Name {string},  Email {string}, PhoneNumber {string}, Password {string} and Confirm Password {string}', async function (firstname, emailid, phoneNumber, password, confirmPassword) {
    await this.registrationPage.fieldValidation(firstname, emailid, phoneNumber, password, confirmPassword);
});

When('I click on submit button', async function () {
    await this.registrationPage.clickSignUpButton();
});

Then('I should see appropriate error messages for each invalid field', async function () {
    await this.registrationPage.validationMessage();
});

When('I fill in the registration form with valid First Name {string},Last Name {string}  Email {string}, PhoneNumber {string}, Password {string} , Confirm Password {string} and Occupation {string}', async function (firstname, lastname, emailid, phoneNumber, password, confirmPassword, dropdownOption) {
    await this.registrationPage.registerUser(firstname, lastname, emailid, phoneNumber, password, confirmPassword, dropdownOption);
});

When('I submit the form', async function () {
    await this.registrationPage.clickSignUpButton();
});

Then('I should see success message indicating successful registration', { timeout: 20000 }, async function () {
    if (this.registrationPage.assertRegistrationSuccess()) {

        await this.registrationPage.assertRegistrationSuccess();
    }
    else {
        throw new Error("Registration was not successful");
    }
});

