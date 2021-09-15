const puppeteer = require("puppeteer");

async function getUnits(username, password) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  });

  const page = await browser.newPage();
  const title = await page.title();
  console.log(title);
  await page.goto("https://secure.qut.edu.au/login/");
  await page.type("#username", username);
  await page.type("#password", password);
  await page.click("#kc-login");
  await page.waitForNavigation();
  await page.screenshot({ path: screenshot });

  // go to BB
  await page.goto("https://blackboard.qut.edu.au/");
  const units = await page.evaluate(parseUnits);

  await browser.close();
  return units;
}

module.exports = getUnits;
