const { expect } = require('@playwright/test')
const Registration = require('../Pages/registration');

class POManager {
    constructor(page) {
        this.page = page;
        this.registration = new Registration(this.page);
    }


    getRegistrationPage() {
        return this.registration;
    }
}

module.exports = POManager;