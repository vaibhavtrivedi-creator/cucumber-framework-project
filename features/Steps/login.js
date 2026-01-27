const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const playwright = require("playwright");

Given("the user is on the login page", async function () {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  this.page = page;
  await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await this.page.waitForLoadState("networkidle");
});

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
  "the user should be redirected to the dashboard page",
  { timeout: 10000 },
  async function () {
    await this.page.locator('button[routerlink="/dashboard/cart"]').waitFor();
    await expect(this.page).toHaveURL(
      "https://rahulshettyacademy.com/client/#/dashboard/dash",
    );
  },
);
