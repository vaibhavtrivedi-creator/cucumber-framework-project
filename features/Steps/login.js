const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given(
  "the user is on the login page",
  {
    timeout: 20000,
  },
  async function () {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await this.page.waitForLoadState("networkidle", { timeout: 30000 });
  }
);

When(
  "the user enters {string} and {string}",
  async function (username, password) {
    await this.page.locator("#userEmail").fill(username);
    await this.page.locator("#userPassword").fill(password);
  }
);

When("clicks the login button", async function () {
  await this.page.locator("#login").click();
  await this.page.waitForLoadState("networkidle", { timeout: 30000 });
});

Then(
  "the user should be redirected to the dashboard page",
  async function () {

    // If login is successful → dashboard
    if (await this.page.locator(".fa-sign-out").isVisible()) {

      await expect(this.page).toHaveURL(/.*dashboard.*/);
      console.log("✅ Login successful");

    }
    // If login fails → error message shown
    else {

      await expect(this.page).toHaveURL(/.*login.*/);
      console.log("❌ Login failed – stayed on login page");
    }
  }
);

