const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { time } = require("node:console");

Given(
  "the user is on the login page",
  {
    timeout: 10000,
  },
  async function () {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await this.page.waitForLoadState("networkidle");
  },
);

When(
  "the user enters {string} and {string}",
  async function (username, password) {
    await this.page.locator("#userEmail").fill(username);
    await this.page.locator("#userPassword").fill(password);
  },
);

When("clicks the login button", async function () {
  await this.page.locator("#login").click();
});

Then(
  "the user should be redirected to the dashboard page", async function () {
    await this.page.waitForSelector('button[routerlink="/dashboard/cart"]', { timeout: 30000 });
    await expect(this.page).toHaveURL(
      "https://rahulshettyacademy.com/client/#/dashboard/dash",
    );
  },
);
