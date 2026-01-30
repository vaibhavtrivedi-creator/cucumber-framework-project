const { Before, After, AfterStep, Status } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

Before(async function () {
  this.browser = await chromium.launch({ headless: true, slowMo: 200 });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot();
    await this.attach(screenshot, "image/png");
  }
});

After(async function () {
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
