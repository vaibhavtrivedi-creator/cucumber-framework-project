const { expect, page } = require('@playwright/test');
class Registration {

    constructor(page) {
        this.page = page;
        this.firstName = page.locator("#firstName");
        this.lastName = page.locator("#lastName");
        this.email = page.locator("#userEmail");
        this.phone = page.locator("#userMobile");
        this.occupation = page.locator(".custom-select");
        this.gender = page.locator("input[value='Male']");
        this.password = page.locator("#userPassword");
        this.confirmPassword = page.locator("#confirmPassword");
        this.checkBox = page.locator("input[type='checkbox']");
        this.submitButton = page.locator("#login");
        this.errorMessages = page.locator(".invalid-feedback");


    }
    async navigateToRegistrationPage() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/register");
    }

    async clickSignUpButton() {
        await this.submitButton.click();
    }
    async blankFieldValidation() {


        console.log('First Name');
        await expect(this.errorMessages.nth(0), { hasText: "*First Name is required" }).toBeVisible();
        console.log('Email');
        await expect(this.errorMessages.nth(1), { hasText: "*Email is required" }).toBeVisible();
        console.log('Phone Number');
        await expect(this.errorMessages.nth(2), { hasText: "*Phone Number is required" }).toBeVisible();
        console.log('Password');
        await expect(this.errorMessages.nth(3), { hasText: "*Password is required" }).toBeVisible();
        console.log('Confirm Password');
        await expect(this.errorMessages.nth(4), { hasText: "Confirm Password is required" }).toBeVisible();
        console.log('------------------------ Test -------------------------------------------');
    }

    async fieldValidation(firstname, emailid, phoneNumber, password, confirmPassword) {
        console.log('First Name');
        await this.firstName.fill(firstname);
        await this.email.fill(emailid);
        await this.phone.fill(phoneNumber);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);

    }
    async validationMessage() {

        await expect(this.errorMessages.nth(0), { hasText: "*First Name must be 3 or more character long" }).toBeVisible();
        await expect(this.errorMessages.nth(1), { hasText: "*Enter Valid Email" }).toBeVisible();
        await expect(this.errorMessages.nth(2), { hasText: "*Phone Number must be 10 digit" }).toBeVisible();
        await expect(this.errorMessages.nth(3), { hasText: "Password and Confirm Password must match with each other." }).toBeVisible();
    }

    async registerUser(firstname, lastname, emailid, phoneNumber, password, dropdownOption) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.email.fill(emailid);
        await this.phone.fill(phoneNumber);
        await this.occupation.selectOption(dropdownOption);
        await this.gender.check();
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        await this.checkBox.check();
    }



}

module.exports = Registration;