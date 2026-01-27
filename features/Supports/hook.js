const { Before, After, AfterStep, Status } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();
    await this.attach(screenshot, "image/png");
  }
});
