const fetch = require("node-fetch");
function getNews(query = "qut") {
  const url = new URL(`https://newsdata.io/api/1/news`);
  url.searchParams.append("apikey", process.env.NEWS_API_KEY);
  url.searchParams.append("q", query);
  return fetch(url).then((res) => res.json());
}

module.exports = getNews;
