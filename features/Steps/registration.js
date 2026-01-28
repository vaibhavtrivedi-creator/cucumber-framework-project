const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const POManager = require("../../tests/POManager/POManager");

Given('I am on the registration page', async function () {
    this.poManager = new POManager(this.page);
    this.registrationPage = this.poManager.getRegistrationPage();
    await this.registrationPage.navigateToRegistrationPage();

});
When('I submit the form with blank fields', async function () {
    this.poManager = new POManager(this.page);
    this.registrationPage = this.poManager.getRegistrationPage();
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

