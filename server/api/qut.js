const puppeteer = require("puppeteer");
const fetch = require("node-fetch");

async function parseUnits() {
  const response = await fetch(
    "https://blackboard.qut.edu.au/webapps/portal/execute/tabs/tabAction",
    {
      headers: {
        accept: "text/javascript, text/html, application/xml, text/xml, */*",
        "accept-language": "zh",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-prototype-version": "1.7",
        "x-requested-with": "XMLHttpRequest",
      },
      referrer:
        "https://blackboard.qut.edu.au/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_3_1",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: "action=refreshAjaxModule&modId=_1433_1&tabId=_1_1&tab_tab_group_id=_3_1",
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  ).then((res) => res.text());
  // Parse response
  const parser = new DOMParser();
  const el = parser.parseFromString(response, "text/html");
  const list = Array.from(
    el.getElementById("2021SEM-2").getElementsByClassName("qutmyunits_units3")
  );

  const units = list.map((div) => {
    const text = div.innerText.trim();
    const unitCode = text.split("_")[0];
    const unitName = text.split(":").pop().trim();
    return { unitCode, unitName };
  });
  console.log(units);
  return units;
}

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
