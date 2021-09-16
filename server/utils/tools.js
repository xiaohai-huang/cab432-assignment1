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

module.exports = parseUnits;
