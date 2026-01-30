const { expect } = require('@playwright/test');
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
        await this.page.waitForLoadState('networkidle');
    }

    async clickSignUpButton() {
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async blankFieldValidation() {
        await expect(this.errorMessages.nth(0)).toHaveText("*First Name is required");
        await expect(this.errorMessages.nth(1)).toHaveText("*Email is required");
        await expect(this.errorMessages.nth(2)).toHaveText("*Phone Number is required");
        await expect(this.errorMessages.nth(3)).toHaveText("*Password is required");
        await expect(this.errorMessages.nth(4)).toHaveText("Confirm Password is required");
    }

    async fieldValidation(firstname, emailid, phoneNumber, password, confirmPassword) {
        await this.firstName.fill(firstname);
        await this.email.fill(emailid);
        await this.phone.fill(phoneNumber);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
    }

    async validationMessage() {
        await expect(this.errorMessages.nth(0)).toHaveText("*First Name must be 3 or more character long");
        await expect(this.errorMessages.nth(1)).toHaveText("*Enter Valid Email");
        await expect(this.errorMessages.nth(2)).toHaveText("*Phone Number must be 10 digit");
        await expect(this.errorMessages.nth(3)).toHaveText("Password and Confirm Password must match with each other.");
    }

    async registerUser(firstname, lastname, emailid, phoneNumber, password, confirmPassword, dropdownOption) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.email.fill(emailid);
        await this.phone.fill(phoneNumber);
        if (dropdownOption) await this.occupation.selectOption({ label: dropdownOption });
        await this.gender.check();
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword || password);
        await this.checkBox.check();
    }

    async assertRegistrationSuccess(expectedText = 'Account Created Successfully') {
        const candidates = [
            this.page.locator('.alert-success'),
            this.page.locator('.toast-message'),
            this.page.locator(`text=${expectedText}`),
            this.page.locator('text=Welcome'),
        ];
        for (const locator of candidates) {
            if (await locator.count() > 0) {
                await expect(locator).toBeVisible({ timeout: 30000 });
                return;
            }
        }
        await expect(this.page.locator(`text=${expectedText}`)).toBeVisible({ timeout: 30000 });
    }
}

module.exports = Registration;