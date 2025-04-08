const axios = require("axios");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const nykaaRules = require("../utils/rules/nykaafashion");
const bewakoofRules = require("../utils/rules/bewakoof");
const westSideRules = require("../utils/rules/westside");
const virgoRules = require("../utils/rules/virgo");
const { normalizeUrl } = require("../utils/common");

const DOMAIN_MAP = {
  "https://nykaafashion.com/": nykaaRules,
  "https://www.bewakoof.com/": bewakoofRules,
  "https://www.westside.com/": westSideRules,
  "https://www.virgio.com/": virgoRules,
};
const MAX_DEPTH = 3;
const MAX_CONCURRENT_REQUESTS = 10;

const crawlDomain = async (
  domain,
  extractFn,
  visited = new Set(),
  depth = 0
) => {
  console.log(domain, "------- Domain -------");
  //   console.log(1, visited);
  if (depth > MAX_DEPTH || visited.has(domain)) return [];

  visited.add(domain);
  //   console.log(2, visited);
  try {
    const res = await axios.get(domain, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(res.data);
    // console.log($, "dollar ---");
    const links = $("a")
      .map((i, el) => normalizeUrl($(el).attr("href"), domain))
      .get()
      .filter(Boolean);
    // console.log(3, links);
    const productUrls = new Set();
    const nextLinks = [];
    for (const link of links) {
      if (!visited.has(link)) {
        if (extractFn(link)) productUrls.add(link);
        else nextLinks.push(link);
      }
    }

    const limitedLinks = nextLinks.slice(0, MAX_CONCURRENT_REQUESTS);
    const results = await Promise.allSettled(
      limitedLinks.map((link) =>
        crawlDomain(link, extractFn, visited, depth + 1)
      )
    );
    results.forEach((res) => {
      if (res.status === "fulfilled") {
        res.value.forEach((url) => productUrls.add(url));
      }
    });
    return [...productUrls];
  } catch (err) {
    console.warn("Failed to crawl:", domain, err.message);
    return [];
  }
};

const crawl = async (payload) => {
  const result = {};

  for (const [domain, extractFn] of Object.entries(DOMAIN_MAP)) {
    console.log("🔍 Crawling:", domain);
    const urls = await crawlDomain(domain, extractFn);
    console.log(urls?.length, "urls ----");
    result[domain] = urls;
  }

  console.log("\n\n-------- DONE ----------");
  return result;
};

module.exports = {
  crawl,
};
