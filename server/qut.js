const puppeteer = require("puppeteer");
const parseUnits = require("./utils/tools");
const fetch = require("node-fetch");

async function getUnits(username = "", password = "") {
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
  await page.goto("https://blackboard.qut.edu.au/");
  await page.waitForSelector("#username");

  const title = await page.title();
  console.log(title);
  await page.type("#username", username);
  await page.type("#password", password);
  await page.click("#kc-login");

  // Go to BB to get units
  await page.waitForSelector("#topTabs");
  await page.screenshot({ path: "before-run-js.jpg" });

  const units = (await page.evaluate(parseUnits)) || [];
  await page.screenshot({ path: "after-run-js.jpg" });

  console.log({ units });
  await browser.close();
  return units || [];
}

async function getAssessment(unitCode) {
  const URL = `https://www.qut.edu.au/study/unit/unit-sorcery/courseloop-subject-offerings?unitCode=${unitCode}&years=2021`;
  const response = await fetch(URL, {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
    },
    referrer: `https://www.qut.edu.au/study/unit?unitCode=${unitCode}`,
    method: "GET",
  }).then((res) => res.json());
  // Clean the tasks by removing html tags
  const tasks = response[0].assesment_tasks.map((t) => ({
    ...t,
    short_description: t.short_description.replace(/<\/?[^>]+(>|$)/g, ""),
  }));
  return tasks;
}

module.exports = { getUnits, getAssessment };
