const Registration = require('../pages/signUp');

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