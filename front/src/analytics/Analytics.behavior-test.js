const path = require("path");
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function helloSelenium() {
  const chromeService = new chrome.ServiceBuilder(
    path.resolve(__dirname, "../../webdrivers/chromedriver.exe")
  );
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeService(chromeService)
    .build();
  try {
    await driver.get("http://localhost:3000/");

    const body = await driver.findElement(By.tagName("body"));

    const actions = driver.actions({ async: true });

    await actions.move({ origin: body })
                                        .press()
                                        .click()
                                        .press()
                                        .click()
                                        .press()
                                        .click()
                                        .press()
                                        .click()
                                        .press()
                                        .click()
                                        .press()
                                        .click()
                                        .press()
                                        .click()
                                        .perform();

    await driver.wait(() => false, 10000);
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
}

helloSelenium();
