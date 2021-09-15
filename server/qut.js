const puppeteer = require("puppeteer");

async function getUnits() {
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
  await page.goto("https://www.google.com/");
  const title = await page.title();
  console.log(title);
  await browser.close();
}

module.exports = getUnits;
